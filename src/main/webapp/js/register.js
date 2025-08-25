// === STEP SCROLL FIXES ===
document.addEventListener("DOMContentLoaded", function () {
  ["step4", "step5"].forEach(stepId => {
    const el = document.getElementById(stepId);
    if (el) {
      el.style.maxHeight = "400px";
      el.style.overflowY = "auto";
    }
  });
});

var currentStep = 1;
var debugMode = true;

var contactInfo = {};
var addressInfo = {};
var idInfo = {
  scanType: "",
  firstName: "",
  lastName: "",
  middleName: "",
  suffix: "",
  dateOfBirth: "",
  gender: "",
  nationality: ""
};

// === STEP HANDLING ===
function updateStepIndicator() {
  var dots = document.querySelectorAll(".step-dot");
  dots.forEach(function (dot, index) {
    dot.classList.remove("active", "completed");
    if (index + 1 === currentStep) {
      dot.classList.add("active");
    } else if (index + 1 < currentStep) {
      dot.classList.add("completed");
    }
  });
}

function nextStep() {
  if (currentStep < 7) { // changed from 6 → 7
    document.getElementById("step" + currentStep).classList.remove("active");
    currentStep++;
    document.getElementById("step" + currentStep).classList.add("active");
    updateStepIndicator();
  }
}

function previousStep() {
  if (currentStep > 1) {
    document.getElementById("step" + currentStep).classList.remove("active");
    currentStep--;
    document.getElementById("step" + currentStep).classList.add("active");
    updateStepIndicator();
  }
}

// === CONTACT FORM ===
document.getElementById("phone").setAttribute("inputmode", "numeric");
document.getElementById("phone").addEventListener("input", function (e) {
  e.target.value = e.target.value.replace(/\D/g, "");
});
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var phone = document.getElementById("phone").value.trim();
  var email = document.getElementById("email").value.trim();
  if (!phone) return;
  contactInfo.phone = phone;
  contactInfo.email = email;
  nextStep();
});

// === ADDRESS FORM ===
document.getElementById("addressForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var street = document.getElementById("street").value.trim();
  var apartment = document.getElementById("apartment").value.trim();
  var city = document.getElementById("city").value.trim();
  var province = document.getElementById("province").value.trim();
  var postalCode = document.getElementById("postalCode").value.trim();
  if (!street || !city || !province || !postalCode) return;
  addressInfo.street = street;
  addressInfo.apartment = apartment;
  addressInfo.city = city;
  addressInfo.province = province;
  addressInfo.postalCode = postalCode;
  nextStep();
});

// === SCAN TYPE SELECTION ===
document.getElementById("scanTypeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var scanType = document.getElementById("scanType").value;
  if (!scanType) return;
  idInfo.scanType = scanType;
  nextStep();
});

// === UPLOAD HANDLING ===
var fileInput = document.getElementById("fileInput");
var uploadArea = document.getElementById("uploadArea");
var preview = document.getElementById("preview");
var previewImage = document.getElementById("previewImage");
var reuploadBtn = document.getElementById("reuploadBtn");
var scanBtn = document.getElementById("scanBtn");
var toReviewBtn = document.getElementById("toReviewBtn");
var processing = document.getElementById("processing");
var ocrStatus = document.getElementById("ocrStatus");

var currentFile = null;
var currentDataURL = null;

uploadArea.addEventListener("dragover", e => {
  e.preventDefault();
  uploadArea.classList.add("dragover");
});
uploadArea.addEventListener("dragleave", e => {
  e.preventDefault();
  uploadArea.classList.remove("dragover");
});
uploadArea.addEventListener("drop", e => {
  e.preventDefault();
  uploadArea.classList.remove("dragover");
  if (e.dataTransfer.files.length > 0) {
    handleFile(e.dataTransfer.files[0]);
  }
});
uploadArea.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", e => {
  if (e.target.files.length > 0) handleFile(e.target.files[0]);
});

function handleFile(file) {
  if (!file.type.startsWith("image/")) {
    showOcrStatus("Please select an image file", "error");
    return;
  }
  var reader = new FileReader();
  reader.onload = e => {
    currentFile = file;
    currentDataURL = e.target.result;
    previewImage.src = currentDataURL;
    preview.style.display = "block";
    uploadArea.style.display = "none";
    reuploadBtn.style.display = "block";
    scanBtn.disabled = false;
  };
  reader.readAsDataURL(file);
}

reuploadBtn.addEventListener("click", () => {
  currentFile = null;
  currentDataURL = null;
  preview.style.display = "none";
  uploadArea.style.display = "block";
  scanBtn.disabled = true;
  toReviewBtn.disabled = true;
  reuploadBtn.style.display = "block";
});

function showOcrStatus(msg, type) {
  ocrStatus.textContent = msg;
  ocrStatus.className = "status-message " + (type === "success" ? "status-success" : "status-error");
  ocrStatus.style.display = "block";
}

// === SCANNING PIPELINE ===
scanBtn.addEventListener("click", async function () {
  if (!currentFile) {
    showOcrStatus("Please upload an image first.", "error");
    return;
  }

  processing.style.display = "block";
  showOcrStatus("Scanning...", "success");

  try {
    let result = await scanImage(currentDataURL);

    if (result.fields) {
      Object.assign(idInfo, result.fields);
    }

    processing.style.display = "none";
    toReviewBtn.disabled = false;
    showOcrStatus("Scan successful! (" + result.method + ")", "success");

    if (debugMode) {
      console.log("Scan Result:", result);
    }
  } catch (err) {
    console.error("Scanning error:", err);
    processing.style.display = "none";
    toReviewBtn.disabled = true;
    showOcrStatus("Error scanning. Try clearer image.", "error");
  }
});

// === SCAN IMAGE ===
async function scanImage(dataUrl) {
  let result = { method: null, raw: null, fields: {} };

  try {
    if (idInfo.scanType === "qrcode") {
      const qrResult = await tryQRCodeScan(dataUrl);
      if (qrResult.success) {
        result.method = "QR Code";
        result.raw = qrResult.data;
        result.fields = parseQRCodeData(qrResult.data);
        return result;
      }
    }

    if (idInfo.scanType === "barcode") {
      const barcodeResult = await tryBarcodeScan(dataUrl);
      if (barcodeResult.success) {
        result.method = "Barcode";
        result.raw = barcodeResult.data;
        result.fields = parseBarcodeData(barcodeResult.data);
        return result;
      }
    }

    if (idInfo.scanType === "passport") {
      const rawOcr = await getRawOCRText(dataUrl);
      const mrzResult = await tryMRZParse(rawOcr);
      if (mrzResult.success) {
        result.method = "MRZ";
        result.raw = rawOcr;
        result.fields = mrzResult.fields;
        return result;
      }
    }

    // fallback OCR
    const ocrResult = await tryOCRScan(dataUrl);
    result.method = "OCR";
    result.raw = ocrResult.text;
    result.fields = extractIDInformation(ocrResult.text);
    return result;

  } catch (error) {
    throw new Error("Failed to scan image");
  }
}

// === QR CODE ===
async function tryQRCodeScan(dataUrl) {
  try {
    const reader = new window.ZXing.BrowserMultiFormatReader(); // note window.ZXing
    const img = await createImageFromDataUrl(dataUrl);
    const result = await reader.decodeFromImageElement(img);
    if (result && result.getText()) {
      return { success: true, data: result.getText() };
    }
  } catch (err) {
    console.warn("QR scan failed:", err);
  }
  return { success: false };
}

function parseQRCodeData(qrText) {
  let fields = {};
  try {
    const jsonData = JSON.parse(qrText);
    if (jsonData.subject) {
      fields.lastName = jsonData.subject.lName || "";
      fields.firstName = jsonData.subject.fName || "";
      fields.middleName = jsonData.subject.mName || "";
      fields.suffix = jsonData.subject.Suffix || "";
      fields.gender = jsonData.subject.sex || "";
      fields.dateOfBirth = jsonData.subject.DOB || "";
      fields.nationality = jsonData.subject.Nationality || "PHL";
    }
    return fields;
  } catch (e) {
    return {};
  }
}

// === BARCODE ===
async function tryBarcodeScan(dataUrl) {
  try {
    const codeReader = new ZXing.BrowserMultiFormatReader();
    const img = await createImageFromDataUrl(dataUrl);
    const result = await codeReader.decodeFromImageElement(img);
    if (result && result.getText()) {
      return { success: true, data: result.getText() };
    }
  } catch (err) {}
  return { success: false };
}

// === MRZ ===
async function tryMRZParse(ocrText) {
  try {
    if (debugMode) {
      console.log("=== Raw OCR Text (MRZ candidate) ===");
      console.log(ocrText);
    }

    const lines = ocrText.split('\n')
      .map(l => l.trim())
      .filter(l => /^[A-Z0-9<]{28,}$/.test(l)); // accept >=28 chars

    if (debugMode) {
      console.log("=== Filtered MRZ Lines ===");
      console.log(lines);
    }

    if (lines.length >= 2) {
      const mrzLines = lines.slice(-2); // last 2 lines
      const l1 = mrzLines[0];
      const l2 = mrzLines[1];

      if (debugMode) {
        console.log("MRZ Line 1:", l1);
        console.log("MRZ Line 2:", l2);
      }

      // --- Names from line 1 ---
      let lastName = "";
      let firstName = "";
      if (l1.includes("<<")) {
        const parts = l1.split("<<");
        lastName = parts[0].substring(5).replace(/</g, " ").trim();
        firstName = (parts[1] || "").replace(/</g, " ").trim();
      }

      // --- Fixed positions from line 2 ---
      const nationality = l2.substring(10, 13).replace(/</g, "").trim(); // 11–13 (1-indexed)
      const dobRaw = l2.substring(14, 20); // 15–20 (YYMMDD, 1-indexed)
      let gender = l2.charAt(21).toUpperCase(); // 22 (1-indexed) -> index 21 (0-indexed)

      let dateOfBirth = "";
      if (/^\d{6}$/.test(dobRaw)) {
        const yy = parseInt(dobRaw.substring(0, 2), 10);
        const mm = dobRaw.substring(2, 4);
        const dd = dobRaw.substring(4, 6);
        const fullYear = yy < 30 ? "20" + yy.toString().padStart(2, "0") : "19" + yy.toString().padStart(2, "0");
        dateOfBirth = `${fullYear}-${mm}-${dd}`;
      }

      if (gender !== "M" && gender !== "F") {
        gender = ""; // fallback if OCR noise
      }

      if (debugMode) {
        console.log("Parsed MRZ fields:", {
          firstName,
          lastName,
          dateOfBirth,
          gender,
          nationality
        });
      }

      return {
        success: true,
        fields: {
          firstName,
          lastName,
          dateOfBirth,
          gender,
          nationality
        }
      };
    }
  } catch (err) {
    console.warn("MRZ parse failed:", err);
  }
  return { success: false };
}

// === OCR ===
async function tryOCRScan(dataUrl) {
  const { data } = await Tesseract.recognize(dataUrl, 'eng');
  return { success: true, text: data.text, confidence: data.confidence };
}

async function getRawOCRText(dataUrl) {
  const { data } = await Tesseract.recognize(dataUrl, 'eng');
  return data.text;
}

function createImageFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}

// === REVIEW ===
toReviewBtn.addEventListener("click", function () {
  if (toReviewBtn.disabled) return;
  renderReview();
  nextStep();
});

function renderReview() {
  // Step 1–2 info (readonly text)
  document.getElementById("revPhone").textContent = contactInfo.phone || "";
  document.getElementById("revEmail").textContent = contactInfo.email || "";
  document.getElementById("revAddress").textContent =
    (addressInfo.street || "") + " " +
    (addressInfo.apartment || "") + ", " +
    (addressInfo.city || "") + ", " +
    (addressInfo.province || "") + " " +
    (addressInfo.postalCode || "");

  // Step 3–4 info (editable)
  document.getElementById("revFirstName").value = idInfo.firstName || "";
  document.getElementById("revLastName").value = idInfo.lastName || "";
  document.getElementById("revMiddleName").value = idInfo.middleName || "";
  document.getElementById("revSuffix").value = idInfo.suffix || "";
  document.getElementById("revDateOfBirth").value = idInfo.dateOfBirth || "";
  document.getElementById("revGender").value = idInfo.gender || "";
  document.getElementById("revNationality").value = idInfo.nationality || "";

  if (currentDataURL) {
    var reviewPhoto = document.getElementById("reviewPhoto");
    reviewPhoto.src = currentDataURL;
    reviewPhoto.style.display = "block";
  }
}

document.getElementById("toPinBtn").addEventListener("click", function () {
  idInfo.firstName = document.getElementById("revFirstName").value.trim();
  idInfo.lastName = document.getElementById("revLastName").value.trim();
  idInfo.middleName = document.getElementById("revMiddleName").value.trim();
  idInfo.suffix = document.getElementById("revSuffix").value.trim();
  idInfo.dateOfBirth = document.getElementById("revDateOfBirth").value.trim();
  idInfo.gender = document.getElementById("revGender").value.trim();
  idInfo.nationality = document.getElementById("revNationality").value.trim();
  nextStep();
});

// === PIN LOGIC (REVISED) ===
document.getElementById("pinForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const pin = document.getElementById("pinField").value.trim();
  const confirmPin = document.getElementById("confirmPinField").value.trim();

  // Must be 6 digits only
  const pinRegex = /^\d{6}$/;

  if (!pinRegex.test(pin) || !pinRegex.test(confirmPin)) {
    alert("PIN must be exactly 6 digits.");
    return;
  }

  if (pin !== confirmPin) {
    alert("PINs do not match.");
    return;
  }

  // ✅ Passed validation → proceed
  nextStep();
});

// === PIN INPUT ENFORCEMENT ===
["pinField", "confirmPinField"].forEach(id => {
  const field = document.getElementById(id);
  field.setAttribute("inputmode", "numeric");
  field.setAttribute("maxlength", "6");
  field.addEventListener("input", function (e) {
    // keep only digits, trim to 6
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
  });
});

// === PIN TOGGLE ===
function setupToggle(fieldId, toggleId) {
  var field = document.getElementById(fieldId);
  var icon = document.getElementById(toggleId);
  icon.addEventListener("click", function () {
    if (field.type === "password") {
      field.type = "text";
      icon.src = "css/images/eye-open.png";
    } else {
      field.type = "password";
      icon.src = "css/images/eye-closed.png";
    }
  });
}
setupToggle("pinField", "togglePin");
setupToggle("confirmPinField", "toggleConfirmPin");
