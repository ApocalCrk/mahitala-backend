const crypto = require('crypto');

function hashToken(token) {
    if (!token) {
        throw new Error("Token is required to hash.");
    }

    const hash = crypto.createHash('sha256');
    hash.update(token);
    return hash.digest('hex');
}

function verifyToken(token, hashedToken) {
    const hashedInputToken = hashToken(token);
    return hashedInputToken === hashedToken;
}

module.exports = { hashToken, verifyToken };