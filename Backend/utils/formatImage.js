import DatauriParser from "datauri/parser.js";
import path from "path";

const parser = new DatauriParser();

// Convert a memory buffer from multer into a data URI that Cloudinary accepts
const formatImage = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer)
    .content;

export default formatImage;