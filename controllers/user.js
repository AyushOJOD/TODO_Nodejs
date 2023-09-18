import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { sendCookie } from "../utils/features.js";
import Errorhandler from "../middlewares/error.js";


export const login = async(req, res, next) => {
    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user) return next(new Errorhandler("User Not found",404))
    else{
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return next(new Errorhandler("Wrong password", 404))

        else{
            sendCookie(user, res, `Welcome Back ${user.name}`, 200);
        }
    }
}

export const register = async(req,res)=>{
    try {
        const {name, email, password} = req.body;

    let user = await User.findOne({email});

    if(user) return next(new Errorhandler("User already exists", 404))
    else{
        const hashedPassword = await bcrypt.hash(password,10);

        user = await User.create({name, email, password: hashedPassword});

        sendCookie(user, res, "Registered Successfully", 201);
    }
    } catch (error) {
        res.status(404).send({message:error.message});
    }
}

export const logout = (req,res) => {
    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === 'Development'?'lax': 'none',  // sameSite will not provide cookie in the development mode  
        secure: process.env.NODE_ENV === 'Development'? false : true
    }).json({
        success : true ,
        message: "Logged out successfully"
    })
}

export const getUserProfile =  (req,res) => {  
    
        res.status(200).json({
            success: true,
            user: req.user
        });
    
}