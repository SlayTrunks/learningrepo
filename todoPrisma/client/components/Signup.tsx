import  {  useState } from 'react'

const Signup = () => {
    const [data,setData] = useState({
        username:"",
        password:""
    })
    const handleSubmit =async(e:any)=>{
        try {
            const response = await fetch("http://localhost:8000/signup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
    
               
            })
            if(!response.ok){
                    throw new Error("Http error or something idk")
            }   
            const result = await response.json()
            localStorage.setItem("todotoken", result.token)
            console.log(result.msg,result)
          } catch (error) {
            console.log(error)
          }
    }
    const handleChange = async(e:any)=>{
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

export default Signup