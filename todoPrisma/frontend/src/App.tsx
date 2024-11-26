import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "../components/Navbar"
import Home from "../components/Home"
import Signup from "../components/Signup"
import Login from "../components/Login"
const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
