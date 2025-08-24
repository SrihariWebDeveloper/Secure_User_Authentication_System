import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Login from './Pages/Login/Login.jsx'
import Verify from './Pages/Verify/Verify.jsx'
import {ToastContainer} from 'react-toastify'
import Forgot from './Pages/Forgot/Forgot.jsx'

const App = () => {
  return (
    <div className='min-h-screen'>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/forgot' element={<Forgot/>}/>
      </Routes>
    </div>
  )
}

export default App
