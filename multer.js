const multer  = require('multer');
var path = require('path');

const diskStorageToUploads = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/images'))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const saveToUploads = multer({storage: diskStorageToUploads});

module.exports = {
    saveToUploads: saveToUploads.single('file')
}