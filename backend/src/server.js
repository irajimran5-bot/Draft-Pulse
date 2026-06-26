import "dotenv/config";
import express from "express";
import cors from "cors" 
import notesRoute from "./routes/notesRoute.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
const app=express();


//middleware-a function that lies between the request and response
app.use(express.json());
app.use((req,res,next)=>{
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
    next();
});
app.use(rateLimiter);
app.use(
    cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true
})
);

app.use("/api/notes",notesRoute);
connectDB().then(()=>{
        app.listen(5001,()=>{
            console.log("Server started on port: 5001");
    });
});
