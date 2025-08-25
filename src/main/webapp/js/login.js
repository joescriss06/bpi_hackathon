// Simple Login Page JavaScript (No Backend)
class LoginManager {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        // Form submission
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));

        // Password toggle
        document.getElementById('togglePassword').addEventListener('click', () => this.togglePassword());
    }

    validateUsername(username) {
        if (!username) {
            this.showNotification('Username is required', 'error');
            return false;
        }
        if (username.length < 3) {
            this.showNotification('Username must be at least 3 characters', 'error');
            return false;
        }
        return true;
    }

    validatePassword(password) {
        if (!password) {
            this.showNotification('Password is required', 'error');
            return false;
        }
        if (password.length < 8) {
            this.showNotification('Password must be at least 8 characters', 'error');
            return false;
        }
        return true;
    }

    handleLogin(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        const isUsernameValid = this.validateUsername(username);
        const isPasswordValid = this.validatePassword(password);

        if (isUsernameValid && isPasswordValid) {
            this.showNotification('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1200);
        }
    }

    togglePassword() {
        const passwordInput = document.getElementById('password');
        const toggleBtn = document.getElementById('togglePassword');
        const eyeClosed = toggleBtn.querySelector('.eye-closed');
        const eyeOpen = toggleBtn.querySelector('.eye-open');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeClosed.style.display = 'none';
            eyeOpen.style.display = 'block';
        } else {
            passwordInput.type = 'password';
            eyeClosed.style.display = 'block';
            eyeOpen.style.display = 'none';
        }
    }

    showNotification(message, type = 'info') {
        const notif = document.createElement('div');
        notif.className = `notification ${type}`;
        notif.textContent = message;

        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 18px;
            border-radius: 8px;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            color: white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: fadeIn 0.4s ease;
        `;

        document.body.appendChild(notif);

        setTimeout(() => {
            notif.style.animation = 'fadeOut 0.4s ease';
            notif.addEventListener('animationend', () => notif.remove());
        }, 2500);
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    new LoginManager();
});
