const QRcode=require('qrcode');
const linkData=require("../model/linkModel")
const mongoose=require("mongoose");

const genQR=async (req,res)=>{
    // console.log("this is working")
    const {title,links,description}=req.body;
    // console.log(typeof(links))
    if(!links){
        return res.status(400).send({"message":"No data provided"})
    }
    try{
        const link= await linkData.create({title,links,description});
        console.log("link id:"+link.id);
        res.status(200).json({"message":"data successfully submitted to db",id:link.id});
    }catch(err){
        res.status(500).json({"message":"Internal server error"})
    }
    // console.log(links)
    // res.send({"message":"Data submitted successfully"})
}

const getLinks=async (req,res)=>{
    const {id}=req.params;
    const data= await linkData.findById(id);

    if(!data){
        console.log("links not found");
        return res.status(404).json({"error":"links not find"})
    }
    // console.log("retreived data "+data.links)
    // const frontUrl="http://localhost:5173";
    // console.log(process.env.FRONT_URL)
    const qr=await QRcode.toDataURL(process.env.FRONT_URL+"/display/"+id);
    res.status(200).json({data,qr,id});
}

module.exports={genQR,getLinks};