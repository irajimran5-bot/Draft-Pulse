import "dotenv/config";
import express from "express";
import cors from "cors";
import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
import path from "path";

const app = express();
const _dirname = path.resolve();

connectDB();

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV !== "production"){
    app.use((req, res, next) => {
        console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
        next();
    });
}

app.use(rateLimiter);

app.use("/api/notes", notesRoute);


app.get("/", (req, res) => {
    res.send("ThinkBoard Backend is Running Successfully!");
});
if (process.env.NODE_ENV !== "production"){
    app.listen(5001, () => {
        console.log("Server started on port: 5001");
    });
}

export default app;