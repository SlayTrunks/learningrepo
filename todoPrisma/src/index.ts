import { PrismaClient } from "@prisma/client";

import express ,{Request , Response} from "express"
const app = express()

app.use(express.json())

const prisma = new PrismaClient()


app.get("/",(req:Request,res:Response)=>{
    res.send("insanedai")
})

app.post("/signup",async(req:Request,res:Response)=>{
    const resp = await prisma.user.create({
        data:req.body,
        select:{
            id:true,username:true
        }

    })
    res.send(resp);;
})
app.post("/addTodo",async(req:Request,res:Response)=>{
    const resp = await prisma.todo.create({
        data:req.body,
        select:{
            userId:true,id:true,topic:true,description:true
        }

    })
    res.send(resp);
})

app.get("/dashboard",async(req:Request,res:Response)=>{
    const resp = await prisma.todo.findMany({
        where: {userId:1},
        select:{
            topic:true,
            description:true,
            id:true,
            user:{
                select:{
                    username:true,
                    password:true
                }
            }
        }
    })
    res.send(resp)
})  

app.put("/edittodo",async(req:Request,res:Response)=>{
    const {x,whom} = await req.body; 
    // console.log(x,whom)
    const resp = await prisma.todo.update({
        data:x,
        where:whom,
        select:{
            id:true,
            topic:true,
            description:true
        }
        
    })
    res.send(resp)
})

app.delete("/deletetodo",async(req:Request,res:Response)=>{
    const {id} = req.body
    const resp = await prisma.todo.delete({
        where:{id:id},
        select:{
            userId:true,
            id:true,
            topic:true,
            description:true
        }
    })
    res.send( {message:"successfully deleted user",resp})
})

app.put("/updateuser",async(req:Request,res:Response)=>{
    const resp = await prisma.user.update({
        where:{id:1},
        data:req.body,  
        select:{
            username:true,
            password:true
        }
    })
    res.send(resp)
})

app.listen(8000,()=>{
    console.log("server running")
}) 