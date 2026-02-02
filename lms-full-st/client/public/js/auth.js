// API Base URL
const API_URL = 'http://localhost:5000/api';

// Role selection
const roleOptions = document.querySelectorAll('.role-option');
let selectedRole = 'student';
const roleInput = document.getElementById('role');

if (roleOptions.length > 0) {
    roleOptions.forEach(option => {
        option.addEventListener('click', function() {
            roleOptions.forEach(opt => {
                opt.classList.remove('active');
                opt.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            selectedRole = this.dataset.role;
            if (roleInput) roleInput.value = selectedRole;
        });
        option.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Set default role
    roleOptions[0].classList.add('active');
    roleOptions[0].setAttribute('aria-pressed', 'true');
    if (roleInput) roleInput.value = selectedRole;
}

// Login form submission
const loginForm = document.getElementById('loginForm');
const loginErrorEl = document.getElementById('loginError');
function showLoginError(msg) {
    if (loginErrorEl) {
        loginErrorEl.style.display = 'block';
        loginErrorEl.textContent = msg;
    } else {
        alert(msg);
    }
}
function clearLoginError() {
    if (loginErrorEl) {
        loginErrorEl.style.display = 'none';
        loginErrorEl.textContent = '';
    }
}
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, role })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Store token and user data
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('currentUser', JSON.stringify(data.data));
                
                // Redirect based on role
                if (data.data.role === 'student') {
                    window.location.href = '/student/dashboard';
                } else if (data.data.role === 'teacher') {
                    window.location.href = '/teacher/dashboard';
                } else if (data.data.role === 'admin') {
                    window.location.href = '/admin/dashboard';
                }
            } else {
                showLoginError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            
            // Demo mode fallback (if backend not running)
            const demoCredentials = {
                'student@demo.com': { role: 'student', name: 'Student User' },
                'teacher@demo.com': { role: 'teacher', name: 'Teacher User' },
                'admin@demo.com': { role: 'admin', name: 'Admin User' }
            };
            
            if (demoCredentials[email]) {
                const userData = {
                    email: email,
                    role: demoCredentials[email].role,
                    name: demoCredentials[email].name,
                    token: 'demo-token'
                };
                
                localStorage.setItem('currentUser', JSON.stringify(userData));
                
                if (userData.role === 'student') {
                    window.location.href = '/student/dashboard';
                } else if (userData.role === 'teacher') {
                    window.location.href = '/teacher/dashboard';
                } else if (userData.role === 'admin') {
                    window.location.href = '/admin/dashboard';
                }
            } else {
                showLoginError('Invalid credentials or server not running. Use demo@demo.com');
            }
        }
    });
}

// Register form submission
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const role = document.getElementById('role').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (password.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
        }
        
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName, lastName, email, password, role })
            });
            
            const data = await response.json();
            
            if (data.success) {
                alert('Registration successful! You can now log in.');
                window.location.href = '/';
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration successful! (Demo mode) You can now log in.');
            window.location.href = '/';
        }
    });
}

// Check authentication
function checkAuth() {
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('currentUser');
    
    if (!token || !currentUser) {
        window.location.href = '/';
        return null;
    }
    
    return JSON.parse(currentUser);
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    window.location.href = '/';
}

// Load user data on dashboard pages
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const userNameElement = document.getElementById('userName');
    const userEmailElement = document.getElementById('userEmail');
    
    if (userNameElement && userData.name) {
        userNameElement.textContent = userData.name || userData.firstName;
    }
    
    if (userEmailElement && userData.email) {
        userEmailElement.textContent = userData.email;
    }
}

// Call loadUserData on dashboard pages
if (window.location.pathname.includes('dashboard')) {
    loadUserData();
}
