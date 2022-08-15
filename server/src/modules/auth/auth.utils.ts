import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

export const signJwt = (payload: string | Buffer | Object) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (err) {
    console.log(err);
    return null;
  }
};
