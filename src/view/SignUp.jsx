import React from "react";
import "../Style/signUp.css";
import Container from "../Components/Container";
import Button from "../Components/Button";
import TextField from "../Components/TextField";
import googleLogo from "../assets/Google.png";
import MicrosoftLogo from "../assets/Microsoft.png";
import { Link, useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { isValidateEmail } from "../utils";
import axios from "axios";
import { Oval } from 'react-loader-spinner';



const SignUp = () => {
  const [Email, setEmail] = React.useState("");
  const [EmailError, setEmailError] = React.useState(false);
  const [loading,setLoading] = React.useState(null)

  const navigate = useNavigate()

  const loginWithGoogle = () => {
    window.open("http://localhost:4000/auth/google/callback","_self")
   }
 

  const handleEmail = (e) =>{
    let value = e.target.value;
    setEmail(value);
    if(isValidateEmail(value)){
      setEmailError(false)
    }else{
      setEmailError(true)
    }
  }

  const handleSignUp = () => {
    setLoading(true)
    axios.post("http://localhost:4000/api/user/sendotp",{
       email:Email
    })
    .then(res => {
      if(res.data.err){
        setEmailError(true)
        setLoading(false)
      }
     console.log(res.data)
     if(res.data.success){
       const data = {
         serverOtp: res.data.otp,
         email:Email
       };
       setLoading(false);
       navigate("/otp", {
         state: data // Pass the data inside 'state'
       });
       console.log(res.data.otp);
     }
    })
    .catch(err => {
     console.log(err)
    })
 }
  return (
    <>
      <Container className="box">
        <div className="title">
          <h2>Sign Up</h2>
          <p>Hello there! Looks like you are new here, Sign Up now.</p>
        </div>
        <div className="email">
          <p>
            Email<span>*</span>{" "}
          </p>
          <TextField
            type="email"
            value={Email}
            onChange={handleEmail}
            placeholder={"Enter your email id like abc1234@gmail.com"}
            required={true}
            styles={{
              border: EmailError && '1px solid red'
            }}
            Icon={EmailError && <MdErrorOutline color="var(--text-danger)" />}
          />
          {EmailError && <span style={{ fontSize:12, marginTop:'0.1rem'}}>This email id seems incorrect. Please Try Again!</span>}
          {}
          <Button
            text={loading ?  <Oval
              visible={true}
              height="20"
              width="20"
              color="#fff"
             ariaLabel="oval-loading"
             wrapperStyle={{}}
             wrapperClass=""
             /> : "Generate OTP"}
            disabled={Email === '' || EmailError}
            onClick={() => handleSignUp()}
            styles={{
              width: "fit-content",
            }}
            // onClick={()=>navigate('/otp')}
          />
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
            onClick={() => loginWithGoogle()}
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
          Already have an account? <Link to={'/sign-in'}>Log In</Link>
          </p>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
