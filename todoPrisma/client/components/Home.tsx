import { useEffect, useState } from "react"
import {  Link} from "react-router-dom"



const Home = () => {

  interface Todo {
    id: number;
    topic: string;
    description: string;
    done:boolean;
    user: {
      username: string;
      password: string;
    };
  }
  const [todo,setTodo] = useState<Todo[]>([])
  const fetchData = async()=>{
    const response = await fetch("http://localhost:8000/dashboard",{
      method:"GET",
     headers:{
      "Authorization":`Bearer ${localStorage.getItem("todotoken")}`,
      "Content-Type":"Application/json"

     }

    })
    if(!response.ok){
      return new Error("idk something error in fetching ig")
    }
    const result = await response.json();
    setTodo(result);
    // console.log(result)
    
  }
  const handleDelete = async(e:any)=>{
    const idToBeDeleted = parseInt(e.target.value)
    const response = await fetch("http://localhost:8000/deletetodo",{
      method:"DELETE",
      headers:{
        "Content-Type":"Application/json"
      },
      body:JSON.stringify({id:idToBeDeleted})
    })
    if(!response.ok){
      return new Error("error in deleting cause idk");
    }
    const result = await response.json();
    console.log(result.message,result)
   location.reload()
  }

  const handleClickdone = async(e:any)=>{
    const id = parseInt(e.target.value)
   const response = await fetch(`http://localhost:8000/edittodo/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({done:true})
     
    })
    if(!response.ok){
      return new Error("error in updating idk why");
    }

    const result = await response.json();
    console.log(result)
  }
    useEffect(()=>{
      fetchData()
      
    },[])
    return(
      <div>
        {todo ? todo && todo.map((item,index)=>{
      return(
        <div key={index}>
          <div>{item.done == true ? <h1 className="done" >{item.topic}</h1> :<h1 >{item.topic}</h1> }<button value={item.id} onClick={handleDelete} >delete</button> <Link  to={`/edittodo/${item.id}`} >edit</Link> 
             <button   value={item.id} onClick={handleClickdone}>done</button> </div>
          <p>{item.description}</p>

        </div>
      )
    }) : <div>no todo rightnow</div>
  
  }
      </div>
    )
   

 
  }
  
  export default Home