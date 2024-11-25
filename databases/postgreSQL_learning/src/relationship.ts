import { Client } from "pg";

const client = new Client({
    connectionString:"postgresql://testdb_owner:itQ5D4JgnsZO@ep-aged-haze-a5bapsgg.us-east-2.aws.neon.tech/testdb?sslmode=require"
})

//users table is in index.ts

const createRelation = async()=>{
    try {
        client.connect();
        const result = await client.query(
            `
            CREATE TABLE addresses(
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100),
            country VARCHAR(100),
            street VARCHAR(100),
            pincode VARCHAR(100),
            createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  
            
            )
            `
        )
        console.log("successfully created table", result)
    } catch (error) {
        console.log(error);
    }
}


// const addAddress = async()=>{

//     try {
//    await  client.connect()
//     const addAddress = "INSERT INTO addresses (user_id, city, country,street,pincode) VALUES ($1,$2,$3,$4,$5)"    
//     const values = [3,"birtamode","nepal","musichowk","10090"];
//     const result = await client.query(addAddress,values);
//     console.log("successfully added address", result)
//     } catch (error) {
//         console.log(error)
//     }
// }

// addAddress()

// const getAddress = async()=>{
//    await client.connect();
//     await client.query('BEGIN')
//     const getAddress = "SELECT city, country, pincode,street FROM addresses WHERE user_id=$1"
//     const suerId = [3]
//     const result = await client.query(getAddress,suerId);
//     await client.query("COMMIT")
//     console.log("success",result.rows[0]);
// }
// getAddress()


// ____________________________________________________________________________

// async function insertUserAndAddress(
//     username: string, 
//     email: string, 
//     password: string, 
//     city: string, 
//     country: string, 
//     street: string, 
//     pincode: string
// ) {
//     const client = new Client({
//         connectionString:"postgresql://testdb_owner:itQ5D4JgnsZO@ep-aged-haze-a5bapsgg.us-east-2.aws.neon.tech/testdb?sslmode=require"
//     });

//     try {
//         await client.connect();

//         // Start transaction
//         await client.query('BEGIN');

//         // Insert user
//         const insertUserText = `
//             INSERT INTO users (username, email, password)
//             VALUES ($1, $2, $3)
//             RETURNING id;
//         `;
//         const userRes = await client.query(insertUserText, [username, email, password]);
//         const userId = userRes.rows[0].id;

//         // Insert address using the returned user ID
//         const insertAddressText = `
//             INSERT INTO addresses (user_id, city, country, street, pincode)
//             VALUES ($1, $2, $3, $4, $5);
//         `;
//         await client.query(insertAddressText, [userId, city, country, street, pincode]);

//         // Commit transaction
//         await client.query('COMMIT');

//         console.log('User and address inserted successfully');
//     } catch (err) {
//         await client.query('ROLLBACK'); // Roll back the transaction on error
//         console.error('Error during transaction, rolled back.', err);
//         throw err;
//     } finally {
//         await client.end(); // Close the client connection
//     }
// }

// // Example usage
// insertUserAndAddress(
//     'johndoe', 
//     'john.doe@example.com', 
//     'securepassword123', 
//     'New York', 
//     'USA', 
//     '123 Broadway St', 
//     '10001'
// );




// _______________________________________________________________________________

//joins in postgresql
// join lets you connect both user detail and its address which is in different tables in same place

const joinTwo = `SELECT u.name, u.email, a.city, a.street,  a.pincode
    FROM users u
    JOIN addresses a ON u.id = a.user_id
` // this gives username and address of all the rlelationship between user and address.
//if we want specific one we must add

"WHERE u.id=user id which we want for eg 2"