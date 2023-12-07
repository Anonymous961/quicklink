const QRcode=require('qrcode');

const genQR=(req,res)=>{
    console.log("this is working")
    const {links}=req.body;
    console.log(links)
    res.send({"message":"hello this is working"})
}

module.exports={genQR};