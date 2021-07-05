const multer = require("multer")
const path = require("path")

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
}

// permet de changer le nom du fichier en rajoutant la date de l'upload du fichier pour qu'il soit unique

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname + "../.." + "/images/"))
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_")
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + Date.now() + "." + extension)
  },
})

module.exports = multer({ storage: storage }).single("image")
