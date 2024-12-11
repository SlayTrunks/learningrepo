
import {  NavLink, useNavigate} from "react-router-dom"

const Navbar = () => {
  const access = localStorage.getItem("todotoken")
  const navigate = useNavigate()
  const handleClick = ()=>{
    localStorage.removeItem("todotoken");
    navigate("/signup")
    location.reload()
  }
  return (
    <div className='navbar'>

      <NavLink to={"/"}>home</NavLink>
      {!access && <>
        <NavLink to={"/signup"}>signup</NavLink>
        <NavLink to={"/login"}>login</NavLink></>}
      {access && 
      <>
      <button onClick={handleClick}>Logout</button>
      <NavLink to={"/addtodo"}>add todo</NavLink>
      </>
      }
    </div>
  )
}

export default Navbar