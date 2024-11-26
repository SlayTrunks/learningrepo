import React, { useEffect, useState } from 'react'

const Login = () => {
    const [data,setData] = useState({
        username:"",
        password:""
    })
    const handleSubmit =(e:any)=>{
        console.log(data)
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