import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "../components/Navbar"
import Home from "../components/Home"
import Signup from "../components/Signup"
import Login from "../components/Login"
import AddTodo from "../components/AddTodo"
import EditTodo from "../components/EditTodo"
const App = () => {
  const access = localStorage.getItem("todotoken")
  return (
    <BrowserRouter>
      <Navbar/>
    <Routes>

      <Route path="/" element={<Home/>}/>
      {
        access && <>
         <Route path="addtodo" element={<AddTodo/>} />
         <Route path="edittodo/:id" element={<EditTodo/>} />
        </>
      }
     {
      !access && <>
       <Route path="/signup" element={<Signup/>}/>
       <Route path="/login" element={<Login/>}/></>
     }
    </Routes>
    </BrowserRouter>
  )
}

export default App
