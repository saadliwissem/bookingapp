import React, { useContext } from 'react'
import "./Navbar.css"
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
const uri="https://bespoke-treacle-5ca4d6.netlify.app/"
export const Navbar = () => {
  const { user} = useContext(AuthContext)
console.log(user)
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color: "inherit", textDecoration:"none"}}>
        <span className="logo"> lamabooking</span>
        
        </Link>
        {user ?  user.details.username :<div className="navItems">
          <button className="navButton">Register</button>
           <Link to={uri+"login"}>
          
          <button className="navButton">Login</button>
          </Link>
        </div>}
      </div>
    </div>
  )
}
