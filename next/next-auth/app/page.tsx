//nextauthsecret and nextauth url should be put in .env file also nextauthsecret should be put in route.ts where nextauth is used it is automatically used here.
import { getServerSession } from "next-auth"
export default async function Home(){
    const session = await getServerSession();
return <div>
{JSON.stringify(session)}
</div>
}





















//client way of doing this



// 'use client'
// import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
//
// export default function Home() {
//   return      <SessionProvider>
//        <Hello/> 
//       </SessionProvider>
// }
// function Hello(){
//     const session = useSession()
//
//     return (
//         <div>
//
//
//
//       {session.status == "authenticated" && <div onClick={()=>signOut()}>
//        signout  
//       </div>} 
//       {session.status == "unauthenticated" && <div onClick={()=>signIn()}>
//        signin  
//       </div>} 
//       <h1>
//       {JSON.stringify(session)} 
//
//       </h1>
//         </div>
//     )
// }
