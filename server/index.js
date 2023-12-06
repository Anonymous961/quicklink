const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")

const app=new express();

app.use(cors())
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.method, req.path);
    next();
})

mongoose.connect();