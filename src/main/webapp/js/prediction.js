function showAlert(message) {
    alert(message);
}

function goBack() {
    // In a real application, this would navigate back to the dashboard
    alert('Navigating back to dashboard...');
    // window.history.back(); // Uncomment this for actual navigation
}

// Chatbot functionality
function toggleChatbot() {
    const chatbotPopup = document.getElementById('chatbotPopup');
    chatbotPopup.classList.toggle('show');
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();

    if (message) {
        addMessage(message, 'user');
        chatInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1000);
    }
}

function addMessage(message, sender) {
    const chatBody = document.querySelector('.chatbot-body');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = message;

    messageDiv.appendChild(bubbleDiv);
    chatBody.appendChild(messageDiv);

    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();

    if (message.includes('prediction') || message.includes('future')) {
        return 'Based on your current savings pattern, you\'ll reach ₱96,000 in 5 years! Would you like me to explain the investment options?';
    } else if (message.includes('bpi') || message.includes('account')) {
        return 'I can help you create a BPI account in just 2 minutes! You\'ll need one valid ID. Should I guide you through the process?';
    } else if (message.includes('investment') || message.includes('invest')) {
        return 'Great choice! BPI Investment Funds and UITFs can help your money grow faster than regular savings. Want to see recommended funds?';
    } else if (message.includes('insurance') || message.includes('protection')) {
        return 'Health and education insurance will protect your savings from unexpected expenses. Would you like to see coverage options?';
    } else if (message.includes('balance') || message.includes('money')) {
        return 'Your current balance is ₱2,500.78. At this rate, you\'re on track to meet your savings goals!';
    } else if (message.includes('help') || message.includes('support')) {
        return 'I can help you with: Savings predictions, BPI account creation, Investment options, Insurance plans, and Financial planning.';
    } else if (message.includes('hello') || message.includes('hi')) {
        return 'Hello! I\'m here to help you understand your financial prediction. What would you like to know?';
    } else if (message.includes('thank')) {
        return 'You\'re welcome! Remember, starting your savings journey early is the best decision for your future!';
    } else {
        return 'That\'s an interesting question about "' + userMessage + '". Let me connect you with our financial advisor for personalized guidance.';
    }
}

// Add interactive effects
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.feature-card, .prediction-card, .info-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click handlers for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.addEventListener('click', function () {
            const features = [
                'Smart Savings feature - AI-powered automatic transfers',
                'Investment Tracker - Real-time portfolio monitoring',
                'Protection Plan - Comprehensive insurance coverage'
            ];
            showAlert(`Learn more about: ${features[index]}`);
        });
    });

    // Animate cards on load
    const animatedElements = document.querySelectorAll('.prediction-card, .info-card, .feature-card');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Close chatbot when clicking outside
    document.addEventListener('click', function (event) {
        const chatbotContainer = document.querySelector('.chatbot-container');
        const chatbotPopup = document.getElementById('chatbotPopup');

        if (!chatbotContainer.contains(event.target) && chatbotPopup.classList.contains('show')) {
            chatbotPopup.classList.remove('show');
        }
    });
});

// ---------- Modal control ----------
function openPredictionModal() {
    const modal = document.getElementById('predictionModal');
    modal.classList.add('show');
    currentStep = 1;
    renderStep();
}

function closePredictionModal() {
    const modal = document.getElementById('predictionModal');
    modal.classList.remove('show');
}

// ---------- Wizard state ----------
let currentStep = 1;

function renderStep() {
    const steps = document.querySelectorAll('.pred-step');
    steps.forEach(s => s.classList.remove('active', 'fade-in'));

    const active = document.querySelector(`.pred-step[data-step="${currentStep}"]`);
    if (active) {
        active.classList.add('active');
        // trigger fade animation
        setTimeout(() => active.classList.add('fade-in'), 10);
    }

    // nav buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    prevBtn.classList.toggle('hidden', currentStep === 1);
    nextBtn.classList.toggle('hidden', currentStep === steps.length);
    submitBtn.classList.toggle('hidden', currentStep !== steps.length);
}

function nextStep() {
    const steps = document.querySelectorAll('.pred-step');
    if (currentStep < steps.length) {
        currentStep += 1;
        renderStep();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep -= 1;
        renderStep();
    }
}

// ---------- Compute prediction ----------
document.getElementById('predictionForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = new FormData(this);
    const currentSavings = toNum(form.get('currentSavings'));
    const monthlySavings = toNum(form.get('monthlySavings'));
    const monthlyDebtPayment = toNum(form.get('monthlyDebtPayment'));
    const goalAmount = toNum(form.get('goalAmount'));
    const goal = (form.get('goal') || '').toString();
    const horizon = (form.get('horizon') || '').toString();

    // Effective monthly capacity
    let netMonthlySave = Math.max(0, monthlySavings - monthlyDebtPayment);

    // Timelines
    const oneYear = currentSavings + netMonthlySave * 12;
    const threeYears = currentSavings + netMonthlySave * 36;
    const fiveYears = currentSavings + netMonthlySave * 60;

    // Months to reach goal
    let monthsToGoal = null;
    if (goalAmount > currentSavings && netMonthlySave > 0) {
        monthsToGoal = Math.ceil((goalAmount - currentSavings) / netMonthlySave);
    }

    // Build advice lines
    const tips = [];
    if (netMonthlySave === 0) {
        tips.push("Your monthly savings capacity is currently ₱0 after debt payments—consider trimming expenses or refinancing debt.");
    } else if (netMonthlySave < 1000) {
        tips.push("Start small but consistent. Aim to increase monthly savings by ₱200–₱500 using automatic transfers.");
    } else {
        tips.push("Great! Automate transfers on payday to lock in your savings habit.");
    }

    // Emergency fund advice
    const monthsReserve = toNum(form.get('monthsReserve'));
    if (monthsReserve >= 3) {
        tips.push(`Target an emergency fund of ~${monthsReserve} months of expenses before investing.`);
    } else {
        tips.push("Build at least 3 months of expenses as an emergency fund before investing.");
    }

    if ((form.get('openInvest') || 'no') === 'yes') {
        tips.push("Once you’ve built your emergency fund, explore conservative UITFs or bond funds for gradual growth.");
    }

    // Render into prediction card
    const card = document.querySelector('.prediction-card');
    if (card) {
        card.innerHTML = `
      <h3>Your Projection</h3>
      <p class="prediction-details">
        With your current plan, you can save about 
        <strong>₱${fmt(oneYear)}</strong> in 1 year, 
        <strong>₱${fmt(threeYears)}</strong> in 3 years, and 
        <strong>₱${fmt(fiveYears)}</strong> in 5 years.
      </p>
      ${
                monthsToGoal !== null
                ? `<p class="prediction-details">
              You can reach your <strong>${escapeHTML(goal)}</strong> goal of 
              <strong>₱${fmt(goalAmount)}</strong> in about 
              <strong>${monthsToGoal}</strong> month${monthsToGoal === 1 ? '' : 's'} 
              (assuming steady savings).
            </p>`
                : `<p class="prediction-details">
              Set a realistic goal amount and a positive monthly savings to get a time-to-goal estimate.
            </p>`
                }
      <h4>Advice</h4>
      <ul class="prediction-details">
        ${tips.map(t => `<li>${escapeHTML(t)}</li>`).join('')}
      </ul>
      <button class="back-btn" onclick="goBack()">Go back to Dashboard</button>
    `;
        card.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    // Close modal
    closePredictionModal();
});

// ---------- Helpers ----------
function toNum(v) {
    const n = parseFloat((v || '').toString().replace(/[, ]/g, ''));
    return Number.isFinite(n) ? n : 0;
}
function fmt(n) {
    return Math.round(n).toLocaleString('en-PH');
}
function escapeHTML(s) {
    return (s || '').toString()
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", "&#39;");
}
 