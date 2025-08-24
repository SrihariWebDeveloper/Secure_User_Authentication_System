import express from 'express'
import { isVerify, LoginUser, logOutUser, reSetOtp, resigetUser, verifyReSetOtp, verifyUsers, verifyUsersOtp } from '../controllers/userController.js';
import {authUser} from '../middlewares/userAuth.js';

const userRoute = express.Router();
//Signup & login & logout
userRoute.post("/register",resigetUser);
userRoute.post("/login",LoginUser);
userRoute.post("/logout",logOutUser);

//verify user
userRoute.get("/auth-verify",authUser,isVerify);

//email varification
userRoute.post("/verify-user",authUser,verifyUsers);
userRoute.post("/verify-user-otp",authUser,verifyUsersOtp);


//reset password
userRoute.post("/reset-verify",reSetOtp);
userRoute.post("/reset-otp",verifyReSetOtp);



export default userRoute;