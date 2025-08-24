import React,{useContext} from 'react'
import { assets } from '../../assets/images/assets.js'
import { userContext } from '../Context/Context.jsx';



const Header = () => {
    const {userData} = useContext(userContext);
  return (
    <div className='w-full flex flex-col justify-center items-center text-center mt-26 gap-2'>
      <img src={assets.header_img} alt="" className='w-30' />
      <div >
        <h2 className="flex flex-row gap-3 justify-center items-center text-xl md:text-3xl font-semibold">Hey {userData?userData.name:"Developer!"} <img src={assets.hand_wave} alt="" className='w-8 h-8' /></h2>
      </div>
      <div className="">
        <h3 className=' text-3xl md:text-4xl font-bold'>Welcome To Our App</h3>
        <p className='my-3 text-[12px] md:text-[16px]'>Let startwith a quick product tour and we will have you up and running in no time!!</p>
        <button className='border px-4 py-2 rounded-full items-center font-medium cursor-pointer hover:bg-slate-100 transition-all'>Get started</button>
      </div>
    </div>
  )
}

export default Header
