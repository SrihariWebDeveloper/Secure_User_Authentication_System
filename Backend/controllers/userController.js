import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import transpoter from "../config/nodeMaler.js";


//signup
const resigetUser = async(req,res)=>{

    const {name,email,password}= req.body;
    if(!name || !email || !password){
        res.json({success:false,message:"Missing Details"});
    }
    try {

        const existUser = await userModel.findOne({email})

        if(existUser){
            res.json({success:false,message:"User Already Exist!!"});
        }

        const hashPassword = await bcrypt.hash(password,10);

        const user = new userModel({name,email,password:hashPassword});

        await user.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SCREAT_KEY,{expiresIn:"7d"});

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production"?"none":"strict",
            maxAge:7 * 24 * 60 * 60 * 1000
        });

        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:'Welcome to Our Website!!',
            text:`Welcome to our website, your Account had been create with this email id ${email}`
        }

        await transpoter.sendMail(mailOptions);

        res.json({success:true});
        
    } catch (error) {
        res.json({success:false,message:error.message});
    }

}

//login
const LoginUser = async(req,res)=>{

    const {email,password} = req.body;

    if(!email || !password){
        res.json({success:false,message:"Please Enter Email and Password"});
    }

    try {
        const user = await userModel.findOne({email})
        if(!user){
            res.json({success:false,message:"Please Enter the Valid Email!!"});
        }

        const verifyPassword = await bcrypt.compare(password,user.password);

        if(!verifyPassword){
            res.json({success:false,message:"Please Enter the Valid Password!!"});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SCREAT_KEY,{expiresIn:"7d"});

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production"?"none":"strict",
            maxAge:7 * 24 * 60 * 60 * 1000
        });

        res.json({success:true});

    } catch (error) {
        res.json({success:false,message:error.message});
    }

}

//logout
const logOutUser = async(req,res)=>{

    try {

        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production"?"none":"strict"
        })

        return res.json({success:true,message:"Logged Out"});
        
    } catch (error) {
        res.json({success:false,message:error.message});
    }

}

const isVerify = async(req,res)=>{
    try {
        res.json({success:true});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

//sending otp to verify email
const verifyUsers = async(req,res)=>{
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId);

        if(user.isAccountVerifyed){
            res.json({success:false,message:"Already verifyed Account"});
        }

        const otp = String(Math.floor(100000+Math.random()*900000))

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24*60*60*1000

        await user.save();

        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:'Account Verification OTP',
            text:`Your OTP is ${otp}. Verify your account using this OTP`
        }

        await transpoter.sendMail(mailOptions);

        res.json({success:true,message:"Veification OTP Sent Your Email Id"});

    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

//checking user otp and db user otp
const verifyUsersOtp = async(req,res)=>{
    try {
        const {otp} = req.body;
        const userId = req.userId;

        if(!userId || !otp){
            return res.json({success:false,message:"Missing Details"});
        }

        const user = await userModel.findById(userId);

        if(!user){
            return res.json({success:false,message:"User Not Found!!"});
        }

        if(user.verifyOtp === ''|| user.verifyOtp !== otp){
            return res.json({success:false,message:"Invalid OTP"});
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success:false,message:"OTP Expired"});
        }

        user.isAccountVerifyed = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        res.json({success:true,message:"Email verifyed Successfully"});

    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

//sending otp to reset password
const reSetOtp = async(req,res)=>{
    try {
        const {email} = req.body;

        if(!email){
            return res.json({success:false,message:"Missing Details"});
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User Not Found!!"});
        }

        const otp = String(Math.floor(100000+Math.random()*900000))

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:'Reset Password - OTP',
            text:`Your OTP is ${otp}. To Reset your Password using this OTP`
        }

        await transpoter.sendMail(mailOptions);

        res.json({success:true,message:"Veification OTP Sent Your Email Id"});

    } catch (error) {
        res.json({success:false,message:error.message});
    }
}


//checking password reset otp and db user password reset otp
const verifyReSetOtp = async(req,res)=>{
    try {
        const {email,otp,password} = req.body;

        if(!email || !otp || !password){
            return res.json({success:false,message:"Missing Details"});
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User Not Found!!"});
        }

        if(user.resetOtp === ''|| user.resetOtp !== otp){
            return res.json({success:false,message:"Invalid OTP"});
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success:false,message:"OTP Expired"});
        }

        const hashPassword = await bcrypt.hash(password,10);
        user.password = hashPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        res.json({success:true,message:"Successfully Your Password Reseted"});

    } catch (error) {
        res.json({success:false,message:error.message});
    }
}


export {resigetUser,logOutUser,LoginUser,verifyUsers,verifyUsersOtp,reSetOtp,verifyReSetOtp,isVerify};