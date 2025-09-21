import multer from "multer";

// Use memory storage; we will send buffer to Cloudinary
const storage = multer.memoryStorage();

// Limit file size to 2 MB and allow only images
const upload = multer({
  storage,
  limits: { fileSize: 2_000_000 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

export default upload;
