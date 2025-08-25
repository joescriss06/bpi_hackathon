<%-- 
    Document   : prediction
    Created on : 08 24, 25, 4:39:21 PM
    Author     : Dodge Lapis
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AiB Banking - Your Projection</title>
        <link rel="stylesheet" href="css/prediction.css">
    </head>
    <body>
        <header class="header">
            <div class="logo">
                <div>
                    <div class="logo-text">AiB</div>
                    <div class="logo-subtext">ALL IN<br>BANKING</div>
                </div>
            </div>
            <nav class="nav-links">
                <a href="#" onclick="showAlert('About Us')">ABOUT US</a>
                <a href="#" onclick="showAlert('Help & Support')">HELP & SUPPORT</a>
                <button class="logout-btn" onclick="showAlert('Logging out...')">Logout</button>
            </nav>
        </header>

        <main class="main-content">
            <div class="content-section">
                <div class="left-section">
                    <div class="welcome-text">
                        <h1>HEY USER!</h1>
                        <h2>Let us check the best decision for you! Answer a few questions so that we can plan your savings!</h2>
                    </div>

                    <div class="prediction-card">
                        <h3>What's the plan?</h3>

                        <button class="check-prediction-btn" type="button" onclick="openPredictionModal()">Unlock your Projection</button>
                        <br><br>
                        <button class="back-btn" onclick="location.href='dashboard.jsp'">Go back to Dashboard</button>

                    </div>
                </div>

                <div class="right-section">
                    <div class="info-card main-info">
                        <h3>What this means for you?</h3>
                        <p>
                            "You're not just saving allowance money — you're already investing in your future.
                            By starting today, you'll have enough to cover tuition, books, or even a laptop 
                            without needing to borrow. You'll also have an emergency fund to rely on while
                            you focus on your studies without financial stress. And if you keep going,
                            you'll be protected from unexpected hospital bills too."
                        </p>
                        <br>
                        <p>
                            <strong>Would you like to open your own BPI account in as fast as 2 minutes with just one 
                                valid ID?</strong> This way, you can start your savings journey today and secure both your 
                            education and your health!"
                        </p>
                        <br>
                        <button class="create-account-btn" onclick="showAlert('Redirecting to BPI account creation...')">Create BPI Account</button>
                    </div>

                    <div class="feature-cards">
                        <div class="feature-card">
                            <div class="card-icon">💰</div>
                            <h4>Smart Savings</h4>
                            <p>Automatic transfers to help you reach your ₱96,000 goal faster with our AI-powered savings assistant.</p>
                        </div>

                        <div class="feature-card">
                            <div class="card-icon">📊</div>
                            <h4>Investment Tracker</h4>
                            <p>Monitor your BPI Investment Funds and UITFs performance with real-time updates and growth projections.</p>
                        </div>

                        <div class="feature-card">
                            <div class="card-icon">🛡️</div>
                            <h4>Protection Plan</h4>
                            <p>Comprehensive health and education insurance coverage to protect your financial journey.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Chatbot Section -->
        <div class="chatbot-container">
            <div class="chatbot-button" onclick="toggleChatbot()">
                <div class="chat-icon">💬</div>
            </div>

            <div class="chatbot-popup" id="chatbotPopup">
                <div class="chatbot-header">
                    <h3>AiB Assistant</h3>
                    <button class="close-chat" onclick="toggleChatbot()">×</button>
                </div>
                <div class="chatbot-body">
                    <div class="chat-message bot-message">
                        <div class="message-bubble">
                            Hi! What can I do for you? 😊
                        </div>
                    </div>
                </div>
                <div class="chatbot-input">
                    <input type="text" id="chatInput" placeholder="Type your message..." onkeypress="handleChatInput(event)">
                    <button onclick="sendMessage()">Send</button>
                </div>
            </div>
        </div>

        <footer class="footer">
            <div class="footer-logo">
                <div>
                    <div class="footer-logo-text">AiB</div>
                    <div class="footer-logo-subtext">ALL IN<br>BANKING</div>
                </div>
            </div>
        </footer>

        <!-- Prediction Wizard Modal -->
        <div id="predictionModal" class="pred-modal" aria-hidden="true">
            <div class="pred-modal__content">
                <button class="pred-modal__close" type="button" onclick="closePredictionModal()">×</button>
                <h2 class="pred-modal__title">Let’s personalize your plan</h2>
                <br>

                <form id="predictionForm">
                    <!-- Education & Work -->
                    <div class="pred-step active" data-step="1">
                        <label>Are you currently a student? If yes, what level?</label>
                        <input name="studentLevel" type="text" placeholder="HS, College, Grad">
                    </div>

                    <div class="pred-step" data-step="2">
                        <label>What is your occupation?</label>
                        <input name="occupation" type="text" placeholder="Employed, Self-employed, OFW, Farmer, etc.">
                    </div>

                    <div class="pred-step" data-step="3">
                        <label>Average monthly income (₱)</label>
                        <input name="monthlyIncome" type="number" min="0" step="1" placeholder="e.g., 15000">
                    </div>

                    <div class="pred-step" data-step="4">
                        <label>Do you have multiple income sources?</label>
                        <select name="multiIncome">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>

                    <div class="pred-step" data-step="5">
                        <label>Enrolled in any scholarship/aid?</label>
                        <select name="aidProgram">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>

                    <!-- Financial Situation -->
                    <div class="pred-step" data-step="6">
                        <label>Do you already have a bank account? (If yes, with which bank?)</label>
                        <input name="bankAccount" type="text" placeholder="e.g., BPI, None">
                    </div>

                    <div class="pred-step" data-step="7">
                        <label>How much savings do you currently have? (₱)</label>
                        <input name="currentSavings" type="number" min="0" step="1" placeholder="e.g., 3000">
                    </div>

                    <div class="pred-step" data-step="8">
                        <label>How much can you realistically set aside per month? (₱)</label>
                        <input name="monthlySavings" type="number" min="0" step="1" placeholder="e.g., 2000">
                    </div>

                    <div class="pred-step" data-step="9">
                        <label>Do you currently have debts or loans? (How much / monthly payments?)</label>
                        <input name="monthlyDebtPayment" type="number" min="0" step="1" placeholder="e.g., 500">
                    </div>

                    <div class="pred-step" data-step="10">
                        <label>Do you receive government cash assistance? (4Ps, DSWD, SSS pension)</label>
                        <select name="govAssistance">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>

                    <!-- Health & Protection -->
                    <div class="pred-step" data-step="11">
                        <label>Do you have any health insurance right now?</label>
                        <select name="hasInsurance">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>

                    <div class="pred-step" data-step="12">
                        <label>How many family members rely on your income for medical needs?</label>
                        <input name="medicalDependents" type="number" min="0" step="1" placeholder="e.g., 2">
                    </div>

                    <div class="pred-step" data-step="13">
                        <label>Have you faced unexpected expenses in the last year due to illness or calamity?</label>
                        <select name="unexpectedExpenses">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>

                    <div class="pred-step" data-step="14">
                        <label>Would you be interested in low-cost microinsurance bundled with savings?</label>
                        <select name="microinsurance">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>

                    <div class="pred-step" data-step="15">
                        <label>Do you want automatic health coverage included with your account?</label>
                        <select name="autoHealth">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>

                    <!-- Goals & Priorities -->
                    <div class="pred-step" data-step="16">
                        <label>What is your main financial goal right now?</label>
                        <select name="goal">
                            <option>Emergency fund</option>
                            <option>Tuition</option>
                            <option>House</option>
                            <option>Business</option>
                            <option>Retirement</option>
                        </select>
                    </div>

                    <div class="pred-step" data-step="17">
                        <label>How soon do you want to achieve this goal?</label>
                        <select name="horizon">
                            <option>1 year</option>
                            <option>3 years</option>
                            <option>5+ years</option>
                        </select>
                    </div>

                    <div class="pred-step" data-step="18">
                        <label>If a calamity strikes, how many months of expenses would you like to have saved?</label>
                        <input name="monthsReserve" type="number" min="0" step="1" placeholder="e.g., 3">
                    </div>

                    <div class="pred-step" data-step="19">
                        <label>Would you prefer rewards (e.g., gift cards, load, groceries) as part of your savings milestones?</label>
                        <select name="rewards">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>

                    <div class="pred-step" data-step="20">
                        <label>Are you open to exploring investment options (UITFs, bonds) once your savings reach a certain level?</label>
                        <select name="openInvest">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>

                    <!-- Wizard Controls -->
                    <div class="pred-wizard__nav">
                        <button class="prevBtn" type="button" onclick="prevStep()">Back</button>
                        <button class="nextBtn" type="button" onclick="nextStep()">Next</button>
                    </div>
                    <div>
                        <br>
                        <button class="submitBtn" type="submit" class="hidden">See My Projection</button>
                    </div>
                </form>
            </div>
        </div>
        <script src="js/prediction.js"></script>
    </body>
</html>