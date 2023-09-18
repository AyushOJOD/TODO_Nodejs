import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async(req, res, next) =>  {
    const {token} = req.cookies;  // first we take the token from the req.cookies

    if(!token) return res.status(404).json({
        success : false,
        message: "Log In First"
    });
    
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodedData._id);
    next();
}