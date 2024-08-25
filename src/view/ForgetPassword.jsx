import React from "react";
import Container from "../Components/Container";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import TextField from "../Components/TextField";
import Button from "../Components/Button";
import { isValidateEmail } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [Email, setEmail] = React.useState("");
  const [EmailError, setEmailError] = React.useState(null);
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

const sendLink = () => {
  axios.post("http://localhost:4000/api/user/forgotpass",{
    email:Email
  })
  .then(res => {
    console.log(res.data)
    alert("Mail Sent Successfully")
  })
  .catch(err => {
    console.log(err)
  })
}

  return (
    <Container className="box">
      <div className="head">
        <div className="back" onClick={() => history.back()}>
          <IoMdArrowRoundBack />
        </div>
        <div className="title">
          <h2>Forgot Password</h2>
          <p>Before resetting, think of all possible passwords!</p>
        </div>
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
            border: EmailError && "1px solid red",
          }}
          Icon={EmailError && <MdErrorOutline color="var(--text-danger)" />}
        />
        {EmailError && (
          <span style={{ fontSize: 12, marginTop: "0.2rem" }}>
            This email id seems incorrect. Please Try Again!
          </span>
        )}
      </div>
      <Button
        text={"Send Reset Link"}
        disabled={Email === "" || EmailError}
        onClick={()=>sendLink()}
        styles={{
          width: "fit-content",
          backgroundColor:"var(--primary-button)"
            
        }}
      />
    </Container>
  );
};

export default ForgetPassword;
