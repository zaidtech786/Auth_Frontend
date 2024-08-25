import React, { useEffect,useRef,useState } from "react";
import "../Style/otp.css";
import Container from "../Components/Container";
import { IoMdArrowRoundBack } from "react-icons/io";
import TextField from "../Components/TextField";
import Button from "../Components/Button";
import googleLogo from "../assets/Google.png";
import MicrosoftLogo from "../assets/Microsoft.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Otp = () => {
  const [OtpError, setOtpError] = React.useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const location = useLocation();
  const {serverOtp,email} = location.state || {};
  console.log(serverOtp,email)


  const navigate = useNavigate();

  const CheckIsOtpCorrect = () => {
    
    let userOtp = '';
    for(let i = 0 ; i < 6 ; i++){
       userOtp+=otp[i];
    }
      if(userOtp != serverOtp ){
        setOtpError(true)
        return
      }
      setOtpError(false)
      const data = {
        email
      }
      navigate("/password",{
        state:data
      });
  }
  
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  const handleChange = (e, index) => {
    const value = e.target.value;
    console.log(value)
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
  
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

  };
  
  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !otp[index] &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };


  const resendOtp = () => {
    axios.post("http://localhost:4000/api/user/sendotp",{
      email
   })
   .then(res => {
    console.log(res.data)
    if(res.data.success){
      const data = {
        serverOtp: res.data.otp,
        email
      };
      navigate("/otp", {
        state: data 
      });
      console.log(res.data.otp);
    }
    alert("Otp Send Successfully")
   })
   .catch(err => {
    console.log(err)
   })
  }

  const loginWithGoogle = () => {
    window.open("http://localhost:4000/auth/google/callback","_self")
   }
 

  return (
    <Container className="box">
      <div className="head">
        <div className="back" onClick={() => history.back()}>
          <IoMdArrowRoundBack />
        </div>
        <div className="title">
          <h2>Enter OTP</h2>
          <p>Fill-in the 6-digit OTP you received in your email</p>
        </div>
      </div>
      <div className="otp">
        <p>
          OTP<span>*</span>
        </p>
        <div className="inputs">
          {otp
            .map((_, index) => (
              <div className="otp-box">
                <TextField
                  maxLength={1}
                  value={otp[index]}
                  ref={(input) => (inputRefs.current[index] = input)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onChange={(e) => handleChange(e, index)}
                  styles={{
                    
                    display: "flex",
                    flex: '1 0 40px',
                    maxWidth:'70px',
                    justifyContent: "center",
                    // marginInline:
                    //   index === 0 ? "0 10px" : index === 5 ? "10px 0" : "10px",
                    borderColor: OtpError && "var(--text-danger)",
                  }}
                  style={{
                    width: "15px",
                    fontSize: "1.5rem",
                  }}
                />
                {index !== 5 && (
                  <div
                    className="dash"
                    style={{ borderColor: OtpError && "var(--text-danger)" }}
                  ></div>
                )}
              </div>
            ))}
        </div>
        {OtpError && (
          <span style={{ fontSize: 16, marginTop: "0.1rem" }}>
            Invalid OTP entered. Please re-check your email and enter!
          </span>
        )}
        <div className="action">
          <Button
            text={"Confirm & Signup"}
            styles={{
              width: "max-content",
              fontSize: "1rem",
            }}
            onClick={() => CheckIsOtpCorrect()}
          />
          <p>
            Didn’t receive OTP? <span style={{cursor:"pointer"}} onClick={() => resendOtp()}>Resend Now</span>
          </p>
        </div>
      </div>
      <div className="or">
        <div></div>
        <p>OR</p>
        <div></div>
      </div>
      <div className="actions">
        <Button
          Icon={
            <img src={googleLogo} alt="googleLogo" width="30" height="30" />
          }
          styles={{
            padding: "15px",
            backgroundColor: "var(--dark-background)",
            borderRadius: "50%",
            border: "1px solid var(--primary-border)",
          }}
          onClick={() =>loginWithGoogle()}
        />
        <Button
          Icon={
            <img
              src={MicrosoftLogo}
              alt="MicrosoftLogo"
              width="30"
              height="30"
            />
          }
          styles={{
            padding: "15px",
            backgroundColor: "var(--dark-background)",
            borderRadius: "50%",
            border: "1px solid var(--primary-border)",
          }}
        />
      </div>
      <div className="note">
        <div className="content">
          <span>Note: </span>
          <p>Signing up via Google saves your time ~20 seconds</p>
        </div>
      </div>
      <div className="next">
        <p>
          Don’t have an account? <Link to={"/sign-in"}>Log In</Link>
        </p>
      </div>
    </Container>
  );
};

export default Otp;
