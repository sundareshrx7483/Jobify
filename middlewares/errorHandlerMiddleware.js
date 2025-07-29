import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statuScode = err.statuScode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "something went wrong!!!, try again later";
  res.status(statuScode).json({ msg });
};

export default errorHandlerMiddleware;
