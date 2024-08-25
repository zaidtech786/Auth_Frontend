import React, { useEffect } from "react";
import "../Style/signIn.css";
import Container from "../Components/Container";
import Button from "../Components/Button";
import TextField from "../Components/TextField";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import googleLogo from "../assets/Google.png";
import MicrosoftLogo from "../assets/Microsoft.png";
import { Link, useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { isValidateEmail } from "../utils";
import axios from "axios";

const SignIn = () => {
  const [Email, setEmail] = React.useState("");
  const [EmailError, setEmailError] = React.useState(null);
  const [Password, setPassword] = React.useState("");
  const [PasswordError, setPasswordError] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);

const navigate = useNavigate()

  const handleEmail = (e) => {
    let value = e.target.value;
    setEmail(value);
    if (isValidateEmail(value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  const handlePassword = (e) => {
    let value = e.target.value;
    setPassword(value);
    if (value.trim().length < 3) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handlePasswordVisibility = () => setIsVisible((p) => !p);

  axios.defaults.withCredentials = true
  const handleSubmit = () => {
    axios.post("http://localhost:4000/api/user/login",{
     email:Email,
     password:Password
    })
    .then(res =>{
      if(res.data.emailErr){
        setEmailError(true)
      }
      else{
        setPasswordError(true)
      }
      console.log(res.data)
      if(res.data.status == 200)
       navigate("/home")
      return
    })
    .catch(err => { 
     console.log(err)
    })
  }

  const loginWithGoogle = () => {
    window.open("http://localhost:4000/auth/google/callback","_self")
   }
 
  useEffect( () => {
   axios.get("http://localhost:4000/login/sucess")
   .then(res => {
     console.log(res.data)
   })
   .catch(err => {
     console.log(err)
   })
  },[])

  return (
    <>
      <Container className="box">
        <div className="title">
          <h2>Sign In</h2>
          <p>Hello there! Looks like you are new here, Sign Up now.</p>
        </div>
        <div className="email">
          <p>
            Email<span>*</span>
          </p>
          <TextField
            type="email"
            value={Email}
            onChange={handleEmail}
            placeholder={"Enter your email id like abc1234@gmail.com"}
            required={true}
            styles={{
              border: EmailError && "1px solid red",
            }}
            Icon={EmailError && <MdErrorOutline color="var(--text-danger)" />}
          />
          {EmailError && (
            <span style={{ fontSize: 12, marginTop: "0.1rem" }}>
              This email id seems incorrect. Please Try Again!
            </span>
          )}

          <p>
            Password<span>*</span>{" "}
          </p>
          <TextField
            type={isVisible ? "text" : "password"}
            value={Password}
            onChange={handlePassword}
            placeholder={"Enter the password you created for your account"}
            required={true}
            styles={{
              border: PasswordError && "1px solid red",
            }}
            Icon={
              <>
                {PasswordError && <MdErrorOutline color="var(--text-danger)" />}
                {isVisible ? (
                  <LuEye cursor="pointer" fontSize={16} onClick={handlePasswordVisibility} />
                ) : (
                  <LuEyeOff
                    onClick={handlePasswordVisibility}
                    cursor="pointer"
                    fontSize={16}
                  />
                )}
              </>
            }
          />
          {PasswordError && (
            <span style={{ fontSize: 12, marginTop: "0.1rem" }}>
              The password you entered is incorrect. Please Try Again!
            </span>
          )}
          <div
            className="btn"
          >
          <Button
            text={"Sign In"}
            onClick={()=>handleSubmit()}
            disabled={Email === "" || EmailError || PasswordError}
            styles={{
              width: "fit-content",
              backgroundColor: (EmailError !==null || PasswordError !== null) ?"var(--primary-button)" :"var(--secondry-button)",
            }}
          />
          <Link to={'/fp'} style={{ color : (EmailError !==null || PasswordError !== null) ?"var(--primary-button)" :"var(--secondry-button)"}}>Forget Password?</Link>
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
            onClick={() =>loginWithGoogle()}
            styles={{
              padding: "15px",
              backgroundColor: "var(--dark-background)",
              borderRadius: "50%",
              border: "1px solid var(--primary-border)",
            }}
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
        <div className="next">
          <p>
            Don’t have an account? <Link to={"/"}>Sign Up</Link>
          </p>
        </div>
      </Container>
    </>
  );
};

export default SignIn;
