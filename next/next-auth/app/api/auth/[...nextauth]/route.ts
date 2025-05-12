
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
    CredentialsProvider({
        name:"Credentials",
        credentials:{
        
        username: { label: "Username", type: "text", placeholder: "Enter your username" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
        },
        async authorize(credentials,req){
            const username = credentials?.username; 
            const password = credentials?.password; 

            // hit the db and cheeck if user exists and get check password and get user
            const user = {
                id:1,
                name:"insane", //username donot return from useSession hook by default but name and email does
                password:"password",
                email:"hello@kdja.com"
            }

            return user
        },

    }),
    GoogleProvider({
        clientId:"insane",
        clientSecret:"secret"
    })
    ],
    secret:process.env.NEXTAUTH_SECRET //put it in .env
})



export {handler as GET, handler as POST}














// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "Enter your username" },
//         password: { label: "Password", type: "password", placeholder: "Enter your password" },
//       },
//       async authorize(credentials,req) {
//           const username = credentials?.username;
//           const password = credentials?.password;
//
//         const user = { id: 1, name: "John Doe", username: "johndoe", password: "password123" };
//
//         if (username === user.username && password === user.password) {
//           return user; // Return user object if authentication is successful
//         }
//
//         return null;
//       },
//     }),
//   ],
// });
//
// export { handler as GET, handler as POST };
//
