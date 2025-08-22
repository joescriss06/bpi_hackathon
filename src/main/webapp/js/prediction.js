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
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .prediction-card, .info-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click handlers for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.addEventListener('click', function() {
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
    document.addEventListener('click', function(event) {
        const chatbotContainer = document.querySelector('.chatbot-container');
        const chatbotPopup = document.getElementById('chatbotPopup');
        
        if (!chatbotContainer.contains(event.target) && chatbotPopup.classList.contains('show')) {
            chatbotPopup.classList.remove('show');
        }
    });
});