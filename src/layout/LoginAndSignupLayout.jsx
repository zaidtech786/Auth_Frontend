import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSection from '../Components/LeftSection'
import '../Style/layout.css'


const LoginAndSignupLayout = () => {
  return (
    <div className='layout'>
        <div className='left__section'>
            <LeftSection />
        </div>
        <div className='right__section'>
            <img src="src/assets/Scale-secure-logo-white.png" alt="" />
            <Outlet />
        </div>
    </div>
  )
}

export default LoginAndSignupLayout