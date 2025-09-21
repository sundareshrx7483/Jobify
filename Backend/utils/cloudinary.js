import cloudinary from "cloudinary";
import * as dotenv from "dotenv";
// Ensure env vars are loaded even if this module is imported early
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;
