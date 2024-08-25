import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const IsLoggedin = ({children}) => {
   
    const [isLoggedIn,setIsLoggedIn] = useState(null);
    axios.defaults.withCredentials = true;
    const verifyToken = () => {
        axios.get("http://localhost:4000/api/user/protected")
        .then(res => {
            console.log(res.data);
            if(res.data.success){
                setIsLoggedIn(true)
                return 
            }
            else{
                setIsLoggedIn(false)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    useEffect( () => {
        verifyToken()
    },[]);

    const LoginWithToken = () => {
        axios.post("http://localhost:4000/api/user/tokenlogin")
        .then(res => {
            console.log(res.data)
            if(res.data.accessToken){
                verifyToken()
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    
     if(isLoggedIn)
       return children;
    else{
       return <>Your Token is expired, Refresh Your Token and login again 
        <button onClick={() => LoginWithToken()}>Login </button>
       </>
    }
}



// export default Auth