const express=require('express')
const router=express.Router();
const {genQR}=require("../controller/qrController");

router.post("/gen",genQR);
router.get("/check",(req,res)=>{
    console.log("this is working")
    res.send({"message":"this is worklng /check"})
})
module.exports=router;