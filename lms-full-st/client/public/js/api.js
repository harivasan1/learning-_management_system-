// Small API helper
const API_URL = 'http://localhost:5000/api';

async function apiGet(path) {
    const res = await fetch(`${API_URL}${path}`, { headers: { 'Content-Type': 'application/json' } });
    return res.json();
}

async function apiPost(path, body) {
    const res = await fetch(`${API_URL}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    return res.json();
}

window.apiGet = apiGet;
window.apiPost = apiPost;