// Modern banking dashboard functionality

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
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate bot response with realistic delay
        setTimeout(() => {
            hideTypingIndicator();
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1200);
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
    
    // Scroll to bottom with smooth animation
    chatBody.scrollTo({
        top: chatBody.scrollHeight,
        behavior: 'smooth'
    });
}

function showTypingIndicator() {
    const chatBody = document.querySelector('.chatbot-body');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-bubble">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Enhanced responses for better user experience
    if (message.includes('balance') || message.includes('money') || message.includes('account')) {
        return 'Your current balance is ₱18,563.84 with a recent increase of ₱317! 📈 Would you like to see your recent transactions or investment options?';
    } else if (message.includes('transfer') || message.includes('send') || message.includes('pay')) {
        return 'I can help you transfer money quickly! 💸 You can use our Quick Transfer feature on the right side of your dashboard, or tell me the amount and recipient.';
    } else if (message.includes('investment') || message.includes('invest') || message.includes('stocks')) {
        return 'Great choice for growing your wealth! 📊 I see you have investments in Apple (+0.25%), Tesla (-3.71%), and Nike (+$5.34). Would you like to explore more investment options?';
    } else if (message.includes('loan') || message.includes('debt') || message.includes('payment')) {
        return 'I see you have an education loan of ₱52,490 remaining with 12 payments left. 🎓 Your monthly payment is ₱4,374.17. Would you like to make an extra payment or explore refinancing options?';
    } else if (message.includes('card') || message.includes('credit') || message.includes('debit')) {
        return 'You have two active cards: Visa Debit (₱11,092.37) and Credit Card (₱7,561.47). 💳 Need help with card settings, limits, or want to add a new card?';
    } else if (message.includes('spending') || message.includes('budget') || message.includes('expense')) {
        return 'This month you\'ve spent ₱6,588.40 total. Your top categories are Food & Dining, Transportation, and Shopping. 🛍️ Want tips on budgeting or expense tracking?';
    } else if (message.includes('currency') || message.includes('exchange') || message.includes('convert')) {
        return 'Our currency converter shows PHP to USD rates updated in real-time! 💱 Currently ₱1,689.45 = $30.16. Need help with international transfers?';
    } else if (message.includes('help') || message.includes('support') || message.includes('assistance')) {
        return 'I\'m here to help with: 💼 Account balances, 💸 Transfers & payments, 📊 Investment advice, 💳 Card management, 📈 Spending analysis, and 💱 Currency conversion. What can I assist you with?';
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return 'Hello there! 👋 Welcome to AiB Banking! I\'m your personal banking assistant. I can help you manage your finances, track spending, make transfers, and much more. What would you like to do today?';
    } else if (message.includes('thank') || message.includes('thanks')) {
        return 'You\'re very welcome! 😊 I\'m always here to help with your banking needs. Feel free to ask me anything about your finances or account management!';
    } else if (message.includes('transaction') || message.includes('history')) {
        return 'Here are your recent transactions: Mobile Top-up (-₱215.30), Food Delivery (-₱352.99), Salary Deposit (+₱25,000), and Uber Ride (-₱180.50). 📋 Want to see more details or filter by category?';
    } else {
        return `I understand you're asking about "${userMessage}". While I don't have specific information about that right now, I can connect you with our customer service team or help you with account management, transfers, investments, or general banking questions. What else can I assist you with? 🤝`;
    }
}

// Dashboard interactions and animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard animations
    initializeAnimations();
    
    // Setup interactive elements
    setupInteractiveElements();
    
    // Setup chatbot
    setupChatbot();
    
    // Setup card animations
    setupCardAnimations();
    
    // Initialize charts (mock data)
    initializeCharts();
});

function initializeAnimations() {
    // Animate cards on load
    const cards = document.querySelectorAll('.welcome-card, .transactions-card, .loan-card, .transfer-card, .investments-card, .currency-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Animate credit cards
    const creditCards = document.querySelectorAll('.credit-card');
    creditCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px) rotateY(15deg)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0) rotateY(0deg)';
        }, 600 + (index * 200));
    });
}

function setupInteractiveElements() {
    // Transaction items hover effect
    const transactionItems = document.querySelectorAll('.transaction-item');
    transactionItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
            this.style.background = 'rgba(102, 126, 234, 0.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.background = 'transparent';
        });
    });
    
    // Investment items click handlers
    const investmentItems = document.querySelectorAll('.investment-item');
    investmentItems.forEach(item => {
        item.addEventListener('click', function() {
            const name = this.querySelector('.investment-name').textContent;
            showAlert(`Opening ${name} investment details...`);
        });
    });
    
    // Quick transfer functionality
    const transferBtn = document.querySelector('.transfer-btn');
    if (transferBtn) {
        transferBtn.addEventListener('click', function() {
            const amount = document.querySelector('.amount-input').value;
            showAlert(`Initiating transfer of ${amount}...`);
        });
    }
    
    // Pay now button
    const payNowBtn = document.querySelector('.pay-now-btn');
    if (payNowBtn) {
        payNowBtn.addEventListener('click', function() {
            showAlert('Redirecting to loan payment portal...');
        });
    }
    
    // Currency swap functionality
    const currencySwap = document.querySelector('.currency-swap');
    if (currencySwap) {
        currencySwap.addEventListener('click', function() {
            this.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 300);
            showAlert('Currency pair swapped!');
        });
    }
}

function setupChatbot() {
    // Close chatbot when clicking outside
    document.addEventListener('click', function(event) {
        const chatbotContainer = document.querySelector('.chatbot-container');
        const chatbotPopup = document.getElementById('chatbotPopup');
        
        if (!chatbotContainer.contains(event.target) && chatbotPopup.classList.contains('show')) {
            chatbotPopup.classList.remove('show');
        }
    });
    
    // Auto-focus input when chatbot opens
    const chatbotButton = document.querySelector('.chatbot-button');
    chatbotButton.addEventListener('click', function() {
        setTimeout(() => {
            const input = document.getElementById('chatInput');
            if (input) input.focus();
        }, 300);
    });
}

function setupCardAnimations() {
    const creditCards = document.querySelectorAll('.credit-card');
    
    creditCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = 'none';
        });
    });
}

function initializeCharts() {
    // Animate progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        setTimeout(() => {
            progressFill.style.width = '65%';
        }, 1000);
    }
    
    // Add mini chart animations
    const miniCharts = document.querySelectorAll('.mini-chart');
    miniCharts.forEach(chart => {
        chart.style.transform = 'scaleX(0)';
        chart.style.transformOrigin = 'left';
        
        setTimeout(() => {
            chart.style.transition = 'transform 1s ease-out';
            chart.style.transform = 'scaleX(1)';
        }, 800);
    });
}

function showAlert(message) {
    // Create a modern toast notification instead of alert
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">ℹ️</span>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add CSS for toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .toast-icon {
        font-size: 18px;
    }
    
    .toast-message {
        font-weight: 500;
        font-size: 14px;
    }
    
    .typing-dots {
        display: flex;
        gap: 4px;
        padding: 8px 0;
    }
    
    .typing-dots span {
        width: 6px;
        height: 6px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        animation: typingBounce 1.4s ease-in-out infinite both;
    }
    
    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typingBounce {
        0%, 80%, 100% {
            transform: scale(0);
        }
        40% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);