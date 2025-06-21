const crypto = require('crypto');

const HASH_ITERATIONS = 100000;
const KEY_LENGTH = 64;
const DIGEST_ALGORITHM = 'sha512';

function hashToken(token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            return reject(new Error("Token is required to hash."));
        }

        const salt = crypto.randomBytes(16).toString('hex');

        crypto.pbkdf2(token, salt, HASH_ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM, (err, derivedKey) => {
            if (err) {
                return reject(err);
            }

            const combinedHash = salt + '.' + derivedKey.toString('hex');
            resolve(combinedHash);
        });
    });
}

function verifyToken(token, combinedHash) {
    return new Promise((resolve, reject) => {
        if (!token || !combinedHash) {
            return reject(new Error("Token and combined hash are required."));
        }

        const [salt, originalHash] = combinedHash.split('.');

        if (!salt || !originalHash) {
            return reject(new Error("Invalid combined hash format. Expected 'salt.hash'."));
        }

        crypto.pbkdf2(token, salt, HASH_ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM, (err, derivedKey) => {
            if (err) {
                return reject(err);
            }
            
            const newHash = derivedKey.toString('hex');
            const isMatch = crypto.timingSafeEqual(Buffer.from(originalHash, 'hex'), Buffer.from(newHash, 'hex'));
            
            resolve(isMatch);
        });
    });
}

module.exports = { hashToken, verifyToken };