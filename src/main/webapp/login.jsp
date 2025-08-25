<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AiB Login - All in Banking</title>
        <link rel="stylesheet" href="css/login.css">
    </head>
    <body>
        <div class="background-wrapper">
            <!-- Animated background elements -->
            <div class="floating-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
                <div class="shape shape-4"></div>
                <div class="shape shape-5"></div>
            </div>

            <div class="login-container">
                <div class="login-card">
                    <!-- Brand Header -->
                    <div class="brand-header">
                        <div class="brand-logo">
                            <div class="logo-icon">?</div>
                            <div class="logo-text">
                                <h2></h2>
                                <span></span>
                            </div>
                        </div>
                        <a href="index.jsp" class="home-link" title="Go to Home">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9,22 9,12 15,12 15,22"/>
                            </svg>
                        </a>
                    </div>

                    <!-- Welcome Section -->
                    <div class="welcome-section">
                        <h3></h3>
                        <p></p>
                    </div>

                    <!-- Login Form -->
                    <form class="login-form" id="loginForm">
                        <div class="input-group">
                            <label for="username">Username</label>
                            <div class="input-wrapper">
                                <input type="text" id="username" placeholder="Enter your username" required>
                                <div class="input-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div class="input-group">
                            <label for="password">Password</label>
                            <div class="input-wrapper">
                                <input type="password" id="password" placeholder="Enter your password" required>
                                <div class="input-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                    <circle cx="12" cy="16" r="1"/>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                </div>
                                <button type="button" class="toggle-password" id="togglePassword">
                                    <svg class="eye-closed" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                    <line x1="1" y1="1" x2="23" y2="23"/>
                                    </svg>
                                    <svg class="eye-open" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="form-options">
                            <label class="remember-me">
                                <input type="checkbox" id="rememberMe">
                                <span class="checkmark"></span>
                                Remember me
                            </label>
                            <a href="#" class="forgot-password">Forgot password?</a>
                        </div>

                        <button type="submit" class="btn-login">
                            <span class="btn-text">Sign In</span>
                            <div class="btn-loader" style="display: none;">
                                <div class="spinner"></div>
                            </div>
                        </button>
                    </form>

                    <!-- Divider -->
                    <div class="divider">
                        <span>OR</span>
                    </div>

                    <!-- Register Section -->
                    <div class="register-section">
                        <p>Don't have an account?</p>
                        <button class="btn-register" onclick="window.location.href = 'register.jsp'">
                            Create Account
                        </button>
                    </div>

                    <!-- Security Note -->
                    <div class="security-note">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        <span>Your data is secured with bank-level encryption</span>
                    </div>
                </div>

                <!-- Side Panel -->
                <div class="side-panel">
                    <div class="side-content">
                        <h2>Fast Sign up</h2>
                        <p>We help you out by filling out your information with our id scanner.</p>
                        <div class="features">
                            <div class="feature">
                                <div class="feature-icon">?</div>
                                <div class="feature-text">
                                    <h4>Smart Insights</h4>
                                    <p>Get your financial insights and spending analytics. Make informed decisions with our AI-powered recommendations.</p>
                                </div>
                            </div>
                            <div class="feature">
                                <div class="feature-icon">?</div>
                                <div class="feature-text">
                                    <h4>Financial Analytics</h4>
                                    <p>AI-powered insights for better decisions</p>
                                </div>
                            </div>
                            <div class="feature">
                                <div class="feature-icon">?</div>
                                <div class="feature-text">
                                    <h4>Bank-Level Security</h4>
                                    <p>Your money and data are always protected</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script src="js/login.js"></script>
    </body>
</html>