import multer from "multer";
export const fileValiadtion = {
  image: ["image/png", "image/jpeg", "image/gif"],
  pdf: ["application/pdf"],
};
export function myMulter(customValidation = fileValiadtion.image) {
  const storage = multer.diskStorage({});

  function fileFilter(req, file, cb) {
    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("invalid format", false);
    }
  }
  const upload = multer({ fileFilter, storage });
  return upload;
}
