import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { sendTemplateEmail } from './emailController.js'
import Template from '../models/templateModel.js';

export const subscribe = asyncHandler(async(req,res) => {
    const { templateName } = req.body;
    const id = req.user?._id;
    const template = await Template.findOne({name:templateName})
    if(template){
        await Template.findOneAndUpdate({ name:templateName },{ subscribers:[...template.subscribers,id] })
        const user = await User.findById(req.user._id)
        if(user){
            await User.findOneAndUpdate({ _id:req.user._id },{ subscribed:[...user.subscribed,template._id] })
        }
        res.status(200).json({ 
            message:"added user",
            success:true
        })
    }
    else{
        res.status(404).json({ message: 'Template not found'})
    }
})

export const getVariables = asyncHandler(async(req,res) => {
    const name = req.params.name
    const template = await Template.findOne({ name })
    if(!template){
        res.status(404).json({
            message:"No template found"
        })
    }
    else{
        res.status(200).json({
            name, 
            succes:true,
            variables:template?.variables,
            clubName:template?.clubName
        })
    }
})

export const sendMails = asyncHandler(async(req,res) => {
    const { name, options } = req.body
    const template = await Template.findOne({ name });
    if(template){
        const usersSubscribed = template?.subscribers;
        usersSubscribed.forEach(async(ele) => {
            const user = await User.findById(ele);
            sendTemplateEmail({...options, templateName:name, name:user.name},user.email);
        })
        res.status(200).json({ 
            message:"Sent",
            success:true
        })
    }
})

export const addTemplate = asyncHandler(async(req,res) => {

})