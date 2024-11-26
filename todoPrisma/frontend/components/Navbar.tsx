import React from 'react'
import {BrowserRouter,  NavLink} from "react-router-dom"

const Navbar = () => {
  return (
    <div className='navbar'>

      <NavLink to={"/"}>home</NavLink>
      <NavLink to={"/signup"}>signup</NavLink>
      <NavLink to={"/login"}>login</NavLink>
      <NavLink to={"/logout"}>Logout</NavLink>
    </div>
  )
}

export default Navbar