import { useContext, useState } from "react"
import "./Login.css"
import {AuthContext} from "../../context/AuthContext.js"
import axios from "axios"
import React from "react"
import profile from "./../image/a.jpg";
import email from "./../image/email.jpg";
import pass from "./../image/pass.png";
import { useNavigate } from "react-router-dom"
export const Login = () => {
  const [credentials, setCredentials]= useState({
    username:undefined,
    password : undefined,
  })
const navigate = useNavigate()
  const { loading , error , dispatch} = useContext(AuthContext)
  const hundleChange= e =>{
    setCredentials((prev)=>({...prev , [e.target.id]: e.target.value}))
  }
  const hundleLogin= async  e=>{
    e.preventDefault()
    dispatch({type : "LOGIN_START"})
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({type : "LOGIN_SUCCESS", payload : res.data})
      navigate("/")
    } catch (error) {
      dispatch({type : "LOGIN_FAILURE", payload : error.response.data})
    }
  }


  return (
    <div className="main">
    <div className="sub-main">
      <div>
        <div className="imgs">
          <div className="container-image">
            <img src={profile} alt="profile" className="profile"/>

          </div>


        </div>
        <div>
          <h1>Login Page</h1>
          <div>
            <img src={email} alt="email" className="email"/>
            <input type="text" placeholder="user name" className="input name" id="username" onChange={hundleChange}/>
          </div>
          <div className="second-input">
            <img src={pass} alt="pass" className="email"/>
            <input type="password" placeholder="password" id="password" className="input name" onChange={hundleChange}/>
          </div>
         <div className="login-button">
         <button disabled={loading} className="button" onClick={hundleLogin}>Login</button>
         </div>
         {error && <span style={{color: "red"}}>
            {error.message}
          </span>}
          
           <p className="link">
             <a >Forgot password ?</a> Or<a >Sign Up</a>
           </p>
          

        </div>
      </div>
      

    </div>
   </div>
  )
  
}
