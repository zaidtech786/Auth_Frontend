import React from 'react'
import "../src/App.css"
import LeftSection from './Components/LeftSection'
import Otp from './Components/Otp'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import ResetPassword from './Components/ResetPassword'
import ForgotPassword from './Components/ForgotPassword'

const Layout = () => {
  return (
    <div className="App">
    <div className="container">
      <LeftSection/>
      <ResetPassword/>
    </div>
  </div>
  )
}

export default Layout