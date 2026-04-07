const multer = require('multer');
const path = require('path');
const { STATIC_PATH } = require('./../constants');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(STATIC_PATH, 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

function fileFilter (req, file, cb) {
  const MIMETYPE_REG_EXP = /^image\/(jpeg|png|jpg)$/;

  const isFileMimetypeCorrect = MIMETYPE_REG_EXP.test(file.mimetype);
  cb(null, isFileMimetypeCorrect);
}

const upload = multer({ storage, fileFilter });

module.exports.uploadPetImage = upload.single('petImage');
