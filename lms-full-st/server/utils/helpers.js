// Small utility helpers for the server

function sendResponse(res, { success = true, status = 200, message = '', data = null } = {}) {
    return res.status(status).json({ success, message, data });
}

// Wrapper to simplify async route handlers
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

function notFound(res, message = 'Not found') {
    return res.status(404).json({ success: false, message });
}

module.exports = {
    sendResponse,
    asyncHandler,
    notFound
};
