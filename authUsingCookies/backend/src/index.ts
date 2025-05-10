import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

const JWT_SECRET = "test123";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
})); //cookie can be accessed from only this third party frontend server.

app.post("/signin", (req, res) => {
    const token = jwt.sign({
        id:1 
    }, JWT_SECRET);
    console.log(token);
    res.cookie("token", token); // sends header as set-cookie and automatically sets cookie in memory of browser . donot need local storage.
    res.send("Logged in!");
});

app.get("/user", (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload; //decoded value is of type JwtPayload now donot need to set req.id = decoded in authMiddleware we can access it without header from frontend. 
    // Get email of the user from the database
    res.send({
        userId: decoded.id
    })
});


app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "Logged out!"
    })
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/index.html")) //../src/index.html rahter then index.html because it will be built on dist folder and that is accessing the index.html rather than src/index.ts is accessing it
})//sending html file rather than json so this can access cookie by itself without worrying about cors origin.

app.listen(3000);
