const multer = require('multer');
const fs = require('fs');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (mimeType && extName) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    }
});

const unlinkImage = (imagePath, callback) => {

    console.log(imagePath);
    if (!imagePath) return callback(null);

    const filePath = path.join(__dirname, '..', '..', 'public', imagePath.replace(/^\/+/, ''));

    console.log(filePath)

    fs.unlink(filePath, (err) => {
        if (err && err.code !== 'ENOENT') {
            return callback(err);
        }
        callback(null);
    });
};

module.exports = {
    upload,
    unlinkImage
};