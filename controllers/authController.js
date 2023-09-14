import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../utils/generateToken.js';
import { welcomeEmail } from './emailController.js'

const register = asyncHandler(async(req,res) => {
    const { name, email, password, number } = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400).json({
            message:"User with this email already exists, Login instead"
        });
    }
    else{
        const user = await User.create({ 
            name, email, password, number, subscribed:[] 
        })
        if(user){
            welcomeEmail(name,email);
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user._id),
                number:user.number,
                subscribed:user.subscribed,
            })
        }
        else{
            res.status(400).json({
                message:"Bad request or invalid data, please check"
            })
        }
    }
})

const login = asyncHandler(async(req,res) => {
    const { email, password } = req.body
    const userExists = await User.findOne({ email })
    if(userExists){
        if(userExists && (await userExists.matchPassword(password))) {
            res.status(200).json({
                _id:userExists._id,
                name:userExists.name,
                email:userExists.email,
                isAdmin:userExists.isAdmin,
                token:generateToken(userExists._id),
                number:userExists.number,
                subscribed:userExists.subscribed,
            })
        }
        else{
            // sendLoginWarningEmail(userExists.name, email)
            res.status(401).json({
                message:"Bad credentials"
            })
        }
    }
    else{
        res.status(404).json({
            message:"User not found"
        })
    }
})

export { register, login }