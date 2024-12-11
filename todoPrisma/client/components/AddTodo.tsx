import  {  useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddTodo = () => {
    const navigate = useNavigate()
    const [data,setData] = useState({
        topic:"",
        description:""
    })
    const handleSubmit =async()=>{
        try {
            const response = await fetch("http://localhost:8000/addtodo",{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("todotoken")}`,
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data)
    
               
            })
            if(!response.ok){
                const result = await response.json()
                    throw new Error(result.error)
            }   
            const result = await response.json()
            
            
            console.log(result)
            navigate('/')
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
        <input type="text" value={data.topic} name='topic' placeholder='title' onChange={handleChange} />
        <input type="text" value={data.description} name='description' placeholder='description' onChange={handleChange} />
        <button onClick={handleSubmit}>submit</button>
    </div>
  )
}

export default AddTodo