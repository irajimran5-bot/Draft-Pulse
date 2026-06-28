import "dotenv/config";
import express from "express";
import cors from "cors" 
import notesRoute from "./routes/notesRoute.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
import path from "path";
const app=express();

const _dirname=path.resolve()
//middleware-a function that lies between the request and response
connectDB();
app.use(express.json());
if(process.env.NODE_ENV!=="production"){
    app.use((req,res,next)=>{
        console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
        next();
    });
}
app.use(rateLimiter);
const allowedOrigins = [
    "http://localhost:5173",
    "https://thinkboard-topaz.vercel.app"
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        methods: ["GET", "POST", "PUT", "DELETE"], 
        credentials: true
    })
);
app.options('*', cors());
app.use("/api/notes",notesRoute);
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(_dirname,"../frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(_dirname,"../frontend","dist","index.html"))
    });
}
export default app;


if (process.env.NODE_ENV !== "production"){
        app.listen(5001,()=>{
            console.log("Server started on port: 5001");
    });
};
