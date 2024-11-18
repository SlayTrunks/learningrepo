import { Client } from "pg";

async function insertData() {

    //connect database


    const client = new Client({
        // host:'ep-aged-haze-a5bapsgg.us-east-2.aws.neon.tech',
        // port:5432,
        // database:"testdb",
        // user:"testdb_owner",
        // password:"itQ5D4JgnsZO"

        connectionString:"postgresql://testdb_owner:itQ5D4JgnsZO@ep-aged-haze-a5bapsgg.us-east-2.aws.neon.tech/testdb?sslmode=require"
    })
    
    

    //create schema table



    // async function createUsersTable(){
    //     try {
    //         await  client.connect()
    //     const result = await client.query(`
    //             CREATE TABLE users (
    //                 id SERIAL PRIMARY KEY NOT NULL,
    //                 name VARCHAR(30) NOT NULL UNIQUE,
    //                 email VARCHAR(40) NOT NULL UNIQUE,
    //                 password VARCHAR(40) NOT NULL,
    //                 createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
    //     )
    //             `)
    //              console.log(result)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // createUsersTable()



    //register user


    // try {
    //     await client.connect();
    //     // const insertQuery = "INSERT INTO users (name, email, password) VALUES ('username2', 'username@2.com' , 'userpassword');"; // this is most likely to get attacked from sql injection so rather do.
    //     // const res = await client.query(insertQuery)

    //     const insertQuery = "INSERT INTO users (name,email,password) VALUES ($1,$2,$3)";
    //     const values = ['username3','username@3.com','passworduser']
    //     const res = await client.query(insertQuery,values)
    //     console.log("Inserting success ", res   )
    // } catch (error) {
    //     console.log(error)
    // } finally{
    //     client.end()
    // }




    //get user;

    
    try {
       await client.connect()
        const getUser = "SELECT * FROM users ";
        const email = ["username@2.com"]
        const res = await client.query(getUser)
        if(res.rows.length>0){
                console.log('user found', res.rows[0]);
        }
        else{
            console.log("no user with the detail found")
            return null;
        }
    } catch (error) {
        console.log("something error:",error)
    }



    //update user


    // try {
    //     await client.connect();
    //     const updateUser = "UPDATE users SET password = $1 WHERE email=$2"
    //     const value = ["123insane", "username@1.com"]
    //     const res = await client.query(updateUser,value)
    //     console.log(res.rows);
    // } catch (error) {
    //     console.log(error)
    // }


    //Delete user

        // await client.connect();

        // const deleteUser = "DELETE FROM users WHERE email=$1";
        // const value = ["username@1.com"]
        // const res = await client.query(deleteUser,value);
        // console.log("successfully deleted" , res)
}




insertData()