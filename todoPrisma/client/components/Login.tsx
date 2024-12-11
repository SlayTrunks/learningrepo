import  {  useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [data,setData] = useState({
        username:"",
        password:""
    })
    const handleSubmit =async()=>{
        try {
            const response = await fetch("http://localhost:8000/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
    
               
            })
            if(!response.ok){
                const result = await response.json()
                    throw new Error(result.error)
            }   
            const result = await response.json()
            localStorage.setItem("todotoken", result.token)
            
            console.log(result.message,result)
            navigate("/")
          } catch (error) {
            console.log(error)
          }
    }
    const handleChange = (e:any)=>{
        setData({...data,
            [e.target.name]:e.target.value
        })
    }
  return (
    <div>
        <input type="text" value={data.username} name='username' onChange={handleChange} />
        <input type="text" value={data.password} name='password' onChange={handleChange} />
        <button onClick={handleSubmit}>submit</button>
    </div>
  )
}

export default Login