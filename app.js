
import express from "express";
import blogRouter from "./routers/blogRouter.js"
import userRouter from "./routers/userRouter.js"
import httpError from "./middleware/errorHandling.js";
import connectDb from "./config/db.js";

const app = express()
app.use(express.json())

app.use("/user",userRouter)
app.use("/blogAuth" , blogRouter)

app.get("/",(req,res,next)=>{
    res.status(200).json("hello from server")
})


app.use((req,res,next)=>{
    return next(new httpError("router not find",400))
})

app.use((error,req,res,next)=>{
    if(req.headersSent){
        return next(error)
    }
    res.status(error.statusCode || 500).json(error.message || "somthing went wrong please try again")
})
const port = 5000


const startServer = async()=>{
    try {
        const connect = await connectDb()

        if(!connect){
            console.log("db failed ",400)
        }

        console.log("db connected")
        
app.listen(port, ()=>{
    console.log("server running on port",port)
})


    } catch (error) {
        console.log(error.message)
    }
}


startServer()

