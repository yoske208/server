import express, { Express } from "express";
import "dotenv/config" 
import router from "./Routers/Router"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"


const app:Express = express()

app.use(cors({
    origin: "",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(router)
// app.use((req,res) => {
//     errorHendale(res,404,"Page not found!!!!!!!")
// })
mongoose.connect(process.env.MONGO_DB || "")
.then(()=>console.log("connect to db   "))
.catch((error) => console.error("error to conect",error)
)

    


app.listen(process.env.PORT || 4000, ()=>{
    console.log(` listen to port http://localhost: ${process.env.PORT || 4000} }  `);
    
})

