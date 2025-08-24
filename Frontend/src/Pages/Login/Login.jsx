import React, { useState,useContext } from 'react'
import { assets } from '../../assets/images/assets'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { userContext } from '../../Components/Context/Context.jsx';


const Login = () => {
  const [state,setState] = useState("Sign Up");
  const {setIsLogind,getUserInfo} = useContext(userContext);
  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');


  const onSubmitHandler = async(e)=>{
    try{
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if(state==="Sign Up"){
        const {data} = await axios.post('https://secure-user-authentication-system-insn.onrender.com/api/auth/register',{name,email,password})
        if(data.success){
          setIsLogind(true);
          getUserInfo();
          navigate('/');
        }else{
          toast.error(data.message);
        }
      }else{
        const {data} = await axios.post('https://secure-user-authentication-system-insn.onrender.com/api/auth/login',{email,password})
        if(data.success){
          getUserInfo();
          setIsLogind(true);
          navigate('/');
        }else{
          toast.error(data.message);
        }
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 to-pink-300'>
      <img src={assets.logo} className='p-8' alt="" />
      <form onSubmit={onSubmitHandler} className="flex flex-col justify-center items-center mt-18 w-auto">
        <div className="bg-slate-800 rounded-md shadow-2xl">
          <div className="mx-18 my-6 text-center">
            <h2 className='text-3xl font-bold text-white'>{state==="Login"?"Login":"Create Account"}</h2>
            <p className='text-slate-500'>{state==="Login"?"Login to your account":"Create your Account"}</p>
          </div>
          <div className="mx-12">
            <div className="flex flex-col gap-3 my-2 text-white">
            {state==="Login"?<></>:<div className="flex flex-row gap-3 border border-slate-400 bg-transparent p-2 rounded-3xl pl-4">
              <img src={assets.person_icon} alt="" />
              <input type="text" onChange={(e)=>setName(e.target.value)} value={name} name="" id="name" placeholder='Full Name' required className='outline-none bg-transparent w-full'/>
            </div>}
            <div className="flex flex-row gap-3 border border-slate-400  p-2 rounded-3xl pl-4">
              <img src={assets.mail_icon} alt="" />
              <input type="email" name="" onChange={(e)=>setEmail(e.target.value)} value={email} id="email" placeholder='Email Id' required className='outline-none bg-transparent w-full' />
            </div>
            <div className="flex flex-row gap-3 border border-slate-400  p-2 rounded-3xl pl-4">
              <img src={assets.lock_icon} alt="" />
              <input type="password" name="" onChange={(e)=>setPassword(e.target.value)} value={password} id="password" placeholder='Password' required autoComplete='none' className='outline-none h-auto bg-transparent w-full' />
            </div>
           {state==="Login"? <div className="text-blue-200 pl-3 text-[12px]">
            <h2 onClick={()=>navigate('/forgot')} className="cursor-pointer">Forgot Password?</h2>
          </div>:<></>}
          <div className="">
            <button type='submit' className='bg-gradient-to-br from-blue-800 to-purple-700 text-white px-4 py-2 rounded-full items-center w-full font-medium cursor-pointer hover:bg-slate-100 transition-all'>{state}</button>
          </div>
          <div className="text-center text-[14px] mb-4">
            {state==="Sign Up"?<p className='text-slate-500'>Already have an account? <span className=' cursor-pointer underline text-blue-500' onClick={()=>setState("Login")}>Login Here</span></p>
            :<p className='text-slate-500'>Don't have an account?<span className=' cursor-pointer underline text-blue-500' onClick={()=>setState("Sign Up")}>Sign Up</span></p>}
          </div>
          </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
