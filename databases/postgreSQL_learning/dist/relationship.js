"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://testdb_owner:itQ5D4JgnsZO@ep-aged-haze-a5bapsgg.us-east-2.aws.neon.tech/testdb?sslmode=require"
});
//users table is in index.ts
const createRelation = async () => {
    try {
        client.connect();
        const result = await client.query(`
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
            `);
        console.log("successfully created table", result);
    }
    catch (error) {
        console.log(error);
    }
};
// const addAddress = async()=>{
//     try {
//     client.connect()
//     const addAddress = "INSERT INTO addresses (user_id, city, country,street,pincode) VALUES ($1,$2,$3,$4,$5)"    
//     const values = [3,"birtamode","nepal","musichowk","10090"];
//     const result = await client.query(addAddress,values);
//     console.log("successfully added address", result)
//     } catch (error) {
//         console.log(error)
//     }
// }
// addAddress()
const getAddress = async () => {
    client.connect();
    const getAddress = "SELECT city, country, pincode,street FROM addresses WHERE user_id=$1";
    const suerId = [3];
    const result = await client.query(getAddress, suerId);
    console.log("success", result.rows[0]);
};
getAddress();
