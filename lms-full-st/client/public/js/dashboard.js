// Simple dashboard helper to load user data and handle logout
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userAvatar = document.getElementById('userAvatar');
    const welcomeName = document.getElementById('welcomeName');

    if (userName && userData.name) userName.textContent = userData.name;
    if (userEmail && userData.email) userEmail.textContent = userData.email;
    if (userAvatar && userData.name) userAvatar.textContent = userData.name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();
    if (welcomeName && userData.name) welcomeName.textContent = userData.name;
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        window.location.href = '/';
    });
}

if (window.location.pathname.includes('/dashboard')) {
    loadUserData();
}