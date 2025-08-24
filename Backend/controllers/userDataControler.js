import userModel from "../models/userModel.js";

const getUserData = async(req,res)=>{
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);

        if(!user){
            res.json({success:false,message:"User Not Found!!"});
        }

        res.json({success:true,userData:{
            name:user.name,
            isAccountVerifyed:user.isAccountVerifyed
        }})
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

export default getUserData;