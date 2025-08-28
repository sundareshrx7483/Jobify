import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  const SECRET_KEY = process.env.JWT_SECRET;
  const EXPIRY = process.env.JWT_EXPIRES_IN;
  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRY });
  return token;
};

export const verifyJWT = (token) => {
  const SECRET_KEY = process.env.JWT_SECRET;
  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const decoded = jwt.verify(token, SECRET_KEY);
  return decoded;
};
