import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  // Handle multer file size and file type errors clearly
  if (err?.code === "LIMIT_FILE_SIZE") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Image is too large. Max size is 2 MB" });
  }
  if (err?.message === "Only image files are allowed") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Only image files are allowed" });
  }

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "something went wrong!!!, try again later";
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
