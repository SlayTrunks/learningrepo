"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const prisma = new client_1.PrismaClient();
app.get("/", (req, res) => {
    res.send("insanedai");
});
app.post("/signup", async (req, res) => {
    const resp = await prisma.user.create({
        data: req.body,
        select: {
            id: true, username: true
        }
    });
    const token = jsonwebtoken_1.default.sign({ id: resp.id }, "12345");
    res.json({ resp, token });
});
app.post("/login", async (req, res) => {
    const { username, passwordx } = req.body;
    const user = await prisma.user.findFirst({
        where: { username: username },
    });
    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, "12345");
    if (user.password = passwordx) {
        return res.status(200).json({ message: "loggedin successfully", user, token });
    }
});
app.post("/addTodo", async (req, res) => {
    const resp = await prisma.todo.create({
        data: req.body,
        select: {
            userId: true, id: true, topic: true, description: true
        }
    });
    res.send(resp);
});
app.get("/dashboard", async (req, res) => {
    const resp = await prisma.todo.findMany({
        where: { userId: 1 },
        select: {
            topic: true,
            description: true,
            id: true,
            user: {
                select: {
                    username: true,
                    password: true
                }
            }
        }
    });
    res.send(resp);
});
app.put("/edittodo", async (req, res) => {
    const { x, whom } = await req.body;
    // console.log(x,whom)
    const resp = await prisma.todo.update({
        data: x,
        where: whom,
        select: {
            id: true,
            topic: true,
            description: true
        }
    });
    res.send(resp);
});
app.delete("/deletetodo", async (req, res) => {
    const { id } = req.body;
    const resp = await prisma.todo.delete({
        where: { id: id },
        select: {
            userId: true,
            id: true,
            topic: true,
            description: true
        }
    });
    res.send({ message: "successfully deleted user", resp });
});
app.put("/updateuser", async (req, res) => {
    const resp = await prisma.user.update({
        where: { id: 1 },
        data: req.body,
        select: {
            username: true,
            password: true
        }
    });
    res.send(resp);
});
app.listen(8000, () => {
    console.log("server running");
});
