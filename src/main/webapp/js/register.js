// === STEP 5 SCROLL FIX ===
document.addEventListener("DOMContentLoaded", function () {
  var step5 = document.getElementById("step5");
  if (step5) {
    step5.style.maxHeight = "400px";
    step5.style.overflowY = "auto";
  }
});

var currentStep = 1;
var uploadedFile = null;
var photoDataURL = null;
var debugMode = false;

var contactInfo = {};
var addressInfo = {};
var idInfo = {
  idType: "",
  firstName: "",
  lastName: "",
  middleName: "",
  dateOfBirth: "",
  gender: ""
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
  if (currentStep < 6) {
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
  var nationality = document.getElementById("nationality").value.trim();
  if (!street || !city || !province || !postalCode || !nationality) return;
  addressInfo.street = street;
  addressInfo.apartment = apartment;
  addressInfo.city = city;
  addressInfo.province = province;
  addressInfo.postalCode = postalCode;
  addressInfo.nationality = nationality;
  nextStep();
});

// === ID TYPE SELECTION ===
document.getElementById("idTypeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var idType = document.getElementById("idType").value;
  if (!idType) return;
  idInfo.idType = idType;
  var labelMap = {
    "passport": "Passport",
    "umid": "UMID",
    "postal-id": "Postal ID",
    "prc-id": "PRC ID",
    "drivers-license": "Driver's License",
    "voters-id": "Voter's ID",
    "national-id": "National ID"
  };
  document.getElementById("selectedIdTypeLabel").textContent = labelMap[idType] || "ID";
  nextStep();
});

// === UPLOAD LOGIC ===
var uploadZone = document.getElementById("uploadZone");
var fileInput = document.getElementById("fileInput");
var previewSection = document.getElementById("previewSection");
var previewImage = document.getElementById("previewImage");
var scanBtn = document.getElementById("scanBtn");
var toReviewBtn = document.getElementById("toReviewBtn");
var resetUploadBtn = document.getElementById("resetUploadBtn");
var processing = document.getElementById("processing");
var ocrStatus = document.getElementById("ocrStatus");

uploadZone.addEventListener("click", function () { fileInput.click(); });
uploadZone.addEventListener("dragover", function (e) {
  e.preventDefault();
  uploadZone.classList.add("dragover");
});
uploadZone.addEventListener("dragleave", function () {
  uploadZone.classList.remove("dragover");
});
uploadZone.addEventListener("drop", function (e) {
  e.preventDefault();
  uploadZone.classList.remove("dragover");
  if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
});
fileInput.addEventListener("change", function (e) {
  if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
});

function handleFile(file) {
  if (!file.type.startsWith("image/")) {
    showOcrStatus("Please select a valid image file.", "error");
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showOcrStatus("File too large. Max size is 10MB.", "error");
    return;
  }
  uploadedFile = file;
  var reader = new FileReader();
  reader.onload = function (ev) {
    photoDataURL = ev.target.result;
    previewImage.src = photoDataURL;
    previewSection.style.display = "block";
    scanBtn.disabled = false;
    uploadZone.style.display = "none";
  };
  reader.readAsDataURL(file);
}

resetUploadBtn.addEventListener("click", function () {
  uploadedFile = null;
  photoDataURL = null;
  fileInput.value = "";
  previewImage.src = "";
  previewSection.style.display = "none";
  scanBtn.disabled = true;
  toReviewBtn.disabled = true;
  ocrStatus.style.display = "none";
  uploadZone.style.display = "block";
});

function showOcrStatus(msg, type) {
  ocrStatus.textContent = msg;
  ocrStatus.className = "status-message " + (type === "success" ? "status-success" : "status-error");
  ocrStatus.style.display = "block";
}

// === OCR SCAN HANDLER WITH COMMENTED CHECKS ===
scanBtn.addEventListener("click", async function () {
  if (!uploadedFile) {
    showOcrStatus("Please upload an ID first.", "error");
    return;
  }
  processing.style.display = "block";
  showOcrStatus("Starting OCR...", "success");

  try {
    var result = await Tesseract.recognize(uploadedFile, "eng");
    var text = result.data.text;
    var upperText = text.toUpperCase();

    // === Step 1: Legit Philippine ID check (commented out) ===
    // if (!(upperText.indexOf("REPUBLIC OF THE PHILIPPINES") > -1 || upperText.indexOf("REPUBLIKA NG PILIPINAS") > -1)) {
    //   processing.style.display = "none";
    //   toReviewBtn.disabled = true;
    //   showOcrStatus("This does not look like a Philippine government-issued ID.", "error");
    //   return;
    // }

    // === Step 2: Match selected ID type (commented out) ===
    // var idMatch = checkIdTypeMatch(text, idInfo.idType);
    // if (!idMatch.match) {
    //   processing.style.display = "none";
    //   toReviewBtn.disabled = true;
    //   showOcrStatus("ID type mismatch. Expected " + getIdTypeDisplayName(idInfo.idType), "error");
    //   return;
    // }

    // Step 3: Extract info
    var extracted = extractIDInformation(text, idInfo.idType);
    Object.assign(idInfo, extracted);

    processing.style.display = "none";
    toReviewBtn.disabled = false;
    showOcrStatus("ID scanned successfully! Please review your details.", "success");

  } catch (err) {
    console.error(err);
    processing.style.display = "none";
    toReviewBtn.disabled = true;
    showOcrStatus("Error scanning ID. Try a clearer image.", "error");
  }
});

// === ID TYPE MATCHER ===
function checkIdTypeMatch(text, selectedIdType) {
  var cleanText = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ");
  var idTypeKeywords = {
    "postal-id": ["postal", "philpost", "postal identity card"],
    "prc-id": ["professional regulation commission", "prc"],
    "umid": ["unified multi purpose", "umid", "sss", "gsis"],
    "voters-id": ["commission on elections", "comelec", "voter"],
    "drivers-license": ["land transportation office", "lto", "license"],
    "national-id": ["philippine identification card", "philsys", "national id"],
    "passport": ["passport", "pasaporte"]
  };
  var keywords = idTypeKeywords[selectedIdType] || [];
  var found = keywords.some(function (kw) { return cleanText.indexOf(kw) > -1; });
  return { match: found, reason: found ? "Matched" : "Not matched" };
}

function getIdTypeDisplayName(idType) {
  var names = {
    "passport": "Passport",
    "umid": "UMID",
    "postal-id": "Postal ID",
    "prc-id": "PRC ID",
    "drivers-license": "Driver's License",
    "voters-id": "Voter's ID",
    "national-id": "National ID"
  };
  return names[idType] || "ID";
}

// === INFO EXTRACTION ===
function extractIDInformation(text, idType) {
  var out = {};
  var clean = text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();

  // Names
  var namePattern = /\b([A-Z][a-zA-Z'-]+)\s+([A-Z][a-zA-Z'-]+)(?:\s+([A-Z][a-zA-Z'-]+))?\b/;
  var nameMatch = clean.match(namePattern);
  if (nameMatch) {
    out.firstName = nameMatch[1];
    out.lastName = nameMatch[2];
    if (nameMatch[3]) out.middleName = nameMatch[3];
  }

  // DOB
  var dobMatch = clean.match(/BIRTH[\s:,-]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i);
  if (dobMatch) out.dateOfBirth = dobMatch[1];

  // Gender
  var genderMatch = clean.match(/(MALE|FEMALE|M|F)/i);
  if (genderMatch) out.gender = genderMatch[1];

  return out;
}

// === REVIEW RENDERING ===
toReviewBtn.addEventListener("click", function () {
  if (toReviewBtn.disabled) return;
  renderReview();
  nextStep();
});

function renderReview() {
  var reviewContact = document.getElementById("reviewContact");
  var reviewAddress = document.getElementById("reviewAddress");
  var reviewID = document.getElementById("reviewID");
  var reviewPhoto = document.getElementById("reviewPhoto");

  reviewContact.innerHTML =
    "<div><b>Phone:</b> " + (contactInfo.phone || "") + "</div>" +
    "<div><b>Email:</b> " + (contactInfo.email || "") + "</div>";

  reviewAddress.innerHTML =
    "<div><b>Street:</b> " + (addressInfo.street || "") + "</div>" +
    "<div><b>Apartment:</b> " + (addressInfo.apartment || "") + "</div>" +
    "<div><b>City:</b> " + (addressInfo.city || "") + "</div>" +
    "<div><b>Province:</b> " + (addressInfo.province || "") + "</div>" +
    "<div><b>Postal Code:</b> " + (addressInfo.postalCode || "") + "</div>" +
    "<div><b>Nationality:</b> " + (addressInfo.nationality || "") + "</div>";

  reviewID.innerHTML =
    "<div><b>First Name:</b> " + (idInfo.firstName || "") + "</div>" +
    "<div><b>Last Name:</b> " + (idInfo.lastName || "") + "</div>" +
    "<div><b>Middle Name:</b> " + (idInfo.middleName || "") + "</div>" +
    "<div><b>Date of Birth:</b> " + (idInfo.dateOfBirth || "") + "</div>" +
    "<div><b>ID TYPE:</b> " + getIdTypeDisplayName(idInfo.idType) + "</div>" +
    "<div><b>Gender:</b> " + (idInfo.gender || "") + "</div>";

  if (photoDataURL) {
    reviewPhoto.src = photoDataURL;
    reviewPhoto.style.display = "block";
  }
}

// === PIN LOGIC ===
document.getElementById("pinForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var pin = document.getElementById("pinField").value.replace(/\D/g, "");
  var confirmPin = document.getElementById("confirmPinField").value.replace(/\D/g, "");
  if (pin.length !== 6 || confirmPin.length !== 6) {
    setFinalStatus("PIN must be exactly 6 digits.", false);
    return;
  }
  if (pin !== confirmPin) {
    setFinalStatus("PINs do not match.", false);
    return;
  }
  setFinalStatus("Registration completed successfully!", true);
});

function setFinalStatus(msg, ok) {
  var el = document.getElementById("finalStatus");
  el.textContent = msg;
  el.className = "status-message " + (ok ? "status-success" : "status-error");
  el.style.display = "block";
}

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

document.getElementById("toPinBtn").addEventListener("click", function () {
  nextStep();
});
