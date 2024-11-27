import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
import cors from "cors"
import express ,{Request , Response,NextFunction} from "express"
const app = express()
app.use(cors())
app.use(express.json())

const prisma = new PrismaClient()

interface CustomRequest extends Request {
    id?: string;
}
const middleware =  (req: CustomRequest, res: Response, next: NextFunction):Response<any> | any => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing or malformed." });
    }

    const token = authHeader.split(" ")[1]; 

    try {
        
        const decoded = jwt.verify(token, "12345") as { id: string };

        // Attach user ID to the request object
        req.id = decoded.id;

        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error("Token verification failed:", error); // Log the error for debugging
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};




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
    const token = jwt.sign({id:resp.id},"12345")
    res.json({resp,token});
})
app.post("/login",  async (req: Request, res: Response):Promise<any>=>{
    const {username,password} = req.body;
    const user = await prisma.user.findFirst({
        where: { username: username },
        select:{username:true,password:true,id:true}
    });

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }
    if (user.password !== password) {
        return res.status(401).json({ error: "Invalid password." });
    }
    const token = jwt.sign({id:user.id},"12345");

    return res.status(200).json({ message: "Logged in successfully", user, token });

    
})
app.post("/addTodo",middleware,async(req:Request,res:Response)=>{
    const resp = await prisma.todo.create({
        data:req.body,
        select:{
            userId:true,id:true,topic:true,description:true
        }

    })
    res.send(resp);
})

app.get("/dashboard",middleware,async(req:Request,res:Response)=>{
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

app.put("/edittodo",middleware,async(req:Request,res:Response)=>{
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

app.delete("/deletetodo",middleware,async(req:Request,res:Response)=>{
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

app.put("/updateuser",middleware,async(req:Request,res:Response)=>{
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