const QRcode=require('qrcode');

const genQR=(req,res)=>{
    const {links}=req.body;
    console.log(links)
}

module.export={genQR};