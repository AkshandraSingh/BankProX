import multer, { StorageEngine } from "multer";
import path from "path";
import { Request } from "express";

const imageConfig: StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: Function
  ) => {
    callback(null, path.join(__dirname, "..", "/uploads/profilePic"));
  },
  filename: (req: Request, file: Express.Multer.File, callback: Function) => {
    const ext = path.extname(file.originalname);
    callback(null, `image_${Date.now()}${ext}`);
  },
});

const isImage = (
  req: Request,
  file: Express.Multer.File,
  callback: Function
) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only images are valid."));
  }
};

const upload = multer({
  storage: imageConfig,
  fileFilter: isImage,
});

module.exports = {
  upload,
};
