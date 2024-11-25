//for auto generated client like user,todo which are in prisma.schema we need to write "npx prisma generate" in terminal and then we get user and todo model

import { PrismaClient } from "@prisma/client";
import { PassThrough } from "stream";
const prisma = new PrismaClient()


// interface User {
//     email:string;
//     password:string;
//     firstname:string;
//     lastname?:string;
// }

// async function insertUser(inputData:User){
//     const res = await prisma.user.create({
//         data:inputData,
//         select:{  //what to return when res is logged
//             id:true,
//             email:true,
//             firstname:true,
//             lastname:true
//         }
//     })

//     console.log(res)
// }
// const inputData = {email:"insane1@mail.com",
//     password:"insane",
//     firstname:"slay",
//     lastname:'trunks'

// }
// insertUser(inputData)
// interface updateParams{
//     firstname:string,
//     lastname:string
// }
// async function updateUser(email:string , {firstname,lastname}:updateParams){
//     const res = await prisma.user.update({
//         where:{email:email},
//         data:{
//             firstname,lastname
//         },
//         select:{
//             id:true,email:true,firstname:true,lastname:true
//         }
//     })
//     console.log(res)
// }
// updateUser("insane1@mail.com",{firstname:"insne",lastname:"dai"})


// async function getUser(){
//     let res = await prisma.user.findMany({
//         select:{
//             id:true,
//             email:true,
//             firstname:true,
//             lastname:true
//         }
        
//     });
//     console.log(res)
// }

// getUser()

async function getOneUser(email:string){
    const res = await prisma.user.findFirst({
        where:{email:email},
        select:{
            id:true,
            email:true,
            firstname:true,
            lastname:true
        }
    })
    console.log(res)
}

getOneUser("insane1@mail.com")