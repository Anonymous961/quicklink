require('dotenv').config()
const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const qrRoutes=require("./route/qrgen")

const app=new express();

app.use(cors())
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.method, req.path);
    next();
})
app.use("/qrgen",qrRoutes);
// app.get("/check",(req,res)=>{
//     console.log("this is working")
// })
// console.log(process.env.URI);
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to DB");
        app.listen(process.env.PORT,()=>{
            console.log("server running at port "+ process.env.PORT)
        })
    })
    .catch((err)=>{
        console.log(err.message);
    })