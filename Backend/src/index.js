import express from "express";
import cors from "cors"
import { staticRouter } from "./routes/static.js";


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