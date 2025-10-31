const multer = require('multer')
const { MIME_TYPES } = require('../config/upload.config');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'tmp'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + MIME_TYPES[file.mimetype])
  }
})

const upload = multer({ storage: storage })

module.exports = upload;