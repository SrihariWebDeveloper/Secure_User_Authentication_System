import React, { useContext } from 'react'
import { assets } from '../../assets/images/assets.js'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../Context/Context.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const NavBar = () => {
  const navigate = useNavigate();

  const logout = async()=>{
    try {
      const {data} = await axios.post("https://secure-user-authentication-system-insn.onrender.com/api/auth/logout");

      if(data.success){
        toast.success(data.message);
        setUserData(false);
        setIsLogind(false);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const VerifyEmail = async()=>{
    try {
      const {data}= await axios.post("https://secure-user-authentication-system-insn.onrender.com/api/auth/verify-user");

      if(data.success){
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const getOtp = ()=>{
    VerifyEmail();
    navigate('/verify');
  }
  const {setIsLogind,userData,setUserData} = useContext(userContext);
  return (
    <div>
      <div className="flex justify-between flex-row">
        <div className="">
        <img src={assets.logo} alt="" className='max-w-28 md:max-w-36' />
      </div>
      <div className="mx-12">
        {userData?<>
        <div className="group">
          <h1 className='bg-black text-white w-12 h-12 text-center pt-2.5 rounded-full text-xl font-bold'>{userData.name[0].toUpperCase()}</h1>
          <div className="group-hover:block hidden absolute ml-2 bg-slate-100 shadow transition-all">
            {userData.isAccountVerifyed?<></>:<p className='p-2 text-slate-400 hover:text-black cursor-pointer' onClick={()=>getOtp()}>Verify Account</p>}
            <p className='p-4 text-slate-400 hover:text-black cursor-pointer' onClick={()=>logout()}>Logout</p>
          </div>
        </div>
        </>:<button className='border px-4 py-2 rounded-full flex justify-center flex-row items-center gap-2 font-medium cursor-pointer hover:bg-slate-100 transition-all' onClick={()=>navigate("/login")}>Login <img src={assets.arrow_icon} alt="" className='w-4' /></button>}
      </div>
      </div>
    </div>
  )
}

export default NavBar
