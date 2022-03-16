import * as multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/filesUploaded/')
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + file.mimetype.split('/')[1])
  }
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "image/gif") {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg/png/mp4"), false);
  }
}
export const upload = multer({ storage: storage, fileFilter: fileFilter });

