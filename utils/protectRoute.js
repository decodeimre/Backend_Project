import { verifyToken } from "./token.js";

export const protectRoute = async (req, res, next) => {
  
    try {
    const token = req.cookies.Le_Toquen;
    const verifiedUser = await verifyToken(token, process.env.SECRET_KEY);
      if (verifiedUser.role === "admin") {
        next();
      } else {
        res.status(401).json({ msg: "Unauthorized" });
      }
    }catch (error) {
      next(error);
    }   
  
}