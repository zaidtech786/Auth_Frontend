import React from "react";
import Container from "../Components/Container";
import TextField from "../Components/TextField";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Button from "../Components/Button";
import { FaCheck, FaCheckCircle } from "react-icons/fa";

import "../Style/password.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CheckBox = ({ isCheck = false }) => {
  const styel = isCheck
    ? {
        background: "var(--strong-success)",
        height: "20px",
        width: "20px",
      }
    : {};

  return (
    <>
      <div className="check" style={{ ...styel }}>
        {isCheck && <FaCheck size={12} />}
      </div>
    </>
  );
};



const Password = () => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isConPasswordVisible, setIsConPasswordVisible] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPass,setConfirmPass] = React.useState("");
  const [error,setError] = React.useState(null)
  const location = useLocation()
  const {email} = location.state || {}
  const navigate = useNavigate()
  
  const handlePasswordVisibility = () => setIsPasswordVisible((p) => !p);
  const handleConPasswordVisibility = () => setIsConPasswordVisible((p) => !p);

  const handleClick = () => {
    if(password === confirmPass){
      axios.post("http://localhost:4000/api/user/register",{
        email,
        password
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      setPassword("")
      setConfirmPass("")
      navigate("/sign-in")
    }
    else{
      return alert("Password Not matched")
    }
  }

  const {id} = useParams()


  const resetPassword = () => {
    if(password === confirmPass){
      axios.put("http://localhost:4000/api/user/updatepassword",{
        id,
        password
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      setPassword("")
      setConfirmPass("")
      navigate("/sign-in")
    }
    else{
      return alert("Password Not matched")
    }
  }

  return (
    <Container className="box">
      <div className="title">
        <h2>{id ? "Reset Password" :'Setup Password'}</h2>
        <p>This will take some effort, Relax and then get started!</p>
      </div>
      <div className="password">
        <p>Set-up your 8+ digits password</p>
        <TextField
          type={isPasswordVisible ? "text" : "password"}
          placeholder={"Start entering your new password here..."}
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          Icon={
            isPasswordVisible ? (
              <LuEye cursor="pointer" onClick={handlePasswordVisibility} />
            ) : (
              <LuEyeOff onClick={handlePasswordVisibility} cursor="pointer" />
            )
          }
        />

        <p>Confirm New Password</p>
        <TextField
          type={isConPasswordVisible ? "text" : "password"}
          placeholder={"Start entering your new password here..."}
          required={true}
          value={confirmPass}
          onChange = {(e) => setConfirmPass(e.target.value)}
          Icon={
            isConPasswordVisible ? (
              <LuEye cursor="pointer" onClick={handleConPasswordVisibility} />
            ) : (
              <LuEyeOff
                onClick={handleConPasswordVisibility}
                cursor="pointer"
              />
            )
          }
        />
        <div className="validations">
            <div className="checks">
            <CheckBox isCheck={password?.length >= 8} />
                <p>Password must be at least 8 characters long</p>
            </div>
            <div className="mark" style={{
                height: password?.length >= 8 && "20px",
                width: password?.length >= 8 && "20px"
              }}>
            <div
              className="mark__line"
              style={{
                background: password?.length >= 8 && "var(--strong-success)",
              }}
            ></div>
            </div>
            <div className="checks">
            <CheckBox isCheck={password?.match(/^(?=.*[a-z])(?=.*[A-Z]).*$/)} />
            <p>Password must contain 1 Uppercase & 1 Lowercase letter</p>
            </div>
            <div className="mark" style={{
                height: password?.match(/^(?=.*[a-z])(?=.*[A-Z]).*$/) && "20px",
                width: password?.match(/^(?=.*[a-z])(?=.*[A-Z]).*$/) && "20px"
              }}>
            <div
              className="mark__line"
              style={{
                background:
                  password?.match(/^(?=.*[a-z])(?=.*[A-Z]).*$/) &&
                  "var(--strong-success)",
              }}
            ></div>
            </div>
            <div className="checks">
            <CheckBox isCheck={password?.match(/^(?=.*\d).*$/)} />
            <p>Password must contain atleast one digit like 1,2,3,4,5,6,etc.</p>
            </div>
            <div className="mark" style={{
                height: password?.match(/^(?=.*\d).*$/) && "20px",
                width: password?.match(/^(?=.*\d).*$/) && "20px"
              }}>
            <div
              className="mark__line"
              style={{
                background:
                  password?.match(/^(?=.*\d).*$/) && "var(--strong-success)",
              }}
            ></div>
            </div>
            <div className="checks">
            <CheckBox
              isCheck={password?.match(/^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/)}
            />
            <p>Password must contain atleast one special character like !, @, #, $, etc.</p>
            </div>
          </div>
      </div>
      <Button
        text={!id ? "Save" : "Save & Sign In"}
        styles={{
          width: "fit-content",
        }}
        onClick={id ? () => resetPassword() : () => handleClick()}
      />
    </Container>
  );
};

export default Password;
