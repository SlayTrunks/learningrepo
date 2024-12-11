import  {  useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditTodo = () => {
    const { id } = useParams<{ id: string }>()
    const [todos,setTodos] = useState({
        topic:"",
        description:""
    })
    const navigate = useNavigate()
   
    const fetchData = async()=>{
        const response = await fetch(`http://localhost:8000/getsingletodo/${id}`)
        const result = await response.json();
        // console.log(result);
        setTodos({
            topic:result.topic,
            description:result.description
        })
    }
    useEffect(()=>{
        fetchData()
        console.log({todo:todos})
    },[])
    const handleSubmit =async()=>{
        // console.log(todos)
        try {


            const response = await fetch(`http://localhost:8000/edittodo/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(todos)
    
               
            })
            if(!response.ok){
                const result = await response.json()
                    throw new Error(result.error)
            }   
            // const result = await response.json()
            
            
            // console.log(result)
            navigate('/')
          } catch (error) {
            console.log(error)
          }
    }
    const handleChange = (e:any)=>{
        setTodos({...todos,
            [e.target.name]:e.target.value
        })
    }
  return (
    <div>
        <input type="text" value={todos.topic} name='topic' placeholder='title' onChange={handleChange} />
        <input type="text" value={todos.description} name='description' placeholder='description' onChange={handleChange} />
        <button onClick={handleSubmit}>submit</button>
    </div>
  )
}

export default EditTodo