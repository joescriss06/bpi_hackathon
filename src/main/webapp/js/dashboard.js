function showAlert(message) {
    alert(message);
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
    
    if (message.includes('balance') || message.includes('money')) {
        return 'Your current balance is ₱2,500.78. Would you like to see your transaction history?';
    } else if (message.includes('transfer') || message.includes('send')) {
        return 'I can help you transfer money. Please specify the amount and recipient.';
    } else if (message.includes('investment') || message.includes('invest')) {
        return 'Based on your profile, I recommend BPI Investment Funds. Would you like to see your prediction results?';
    } else if (message.includes('help') || message.includes('support')) {
        return 'I can help you with: Balance inquiries, Money transfers, Investment advice, Account management, and Transaction history.';
    } else if (message.includes('hello') || message.includes('hi')) {
        return 'Hello! I\'m your AiB banking assistant. How can I help you today?';
    } else if (message.includes('thank')) {
        return 'You\'re welcome! Is there anything else I can help you with?';
    } else {
        return 'I understand you\'re asking about "' + userMessage + '". Let me connect you with our customer service for more detailed assistance.';
    }
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.transaction-card, .welcome-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
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

