import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import { staticRouter } from "./routes/static.js";

dotenv.config()
const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(staticRouter)
app.get("/",((req,res)=>{
    res.send("SERVER Started")
}))
app.listen(3000,(()=>{
    console.log("lol");
}))