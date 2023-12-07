const express=require('express')
const router=express.Router();
const {genQR}=require("../controller/qrController");

router.post("/gen",genQR);

module.exports=router;