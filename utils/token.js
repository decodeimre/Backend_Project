import jwt from "jsonwebtoken";
import { promisify } from "util";

 //create token for user
 export const createToken = async (payload, secretKey, options) => {
    const asyncSignIn = promisify(jwt.sign);
    return asyncSignIn(payload, secretKey, options);
  };


export const verifyToken = async (payload, secretKey) => {
    const asyncVerify = promisify(jwt.verify);
    return asyncVerify(payload, secretKey);
  } 