import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginAndSignupLayout from "./layout/LoginAndSignupLayout";
import { ForgetPassword, Otp, Password, SignIn, SignUp,Home } from "./view";
import { IsLoggedin } from "./Authentication/Auth";
import { useEffect } from "react";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginAndSignupLayout />}>
          <Route path="" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn /> } />
          <Route path="otp" element={<Otp />} />
          <Route path="password/:id?/:token?" element={<Password />} />
          <Route path="fp" element={<ForgetPassword />} />
         
        </Route>
        <Route path="/home" element={<IsLoggedin><Home/></IsLoggedin>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
