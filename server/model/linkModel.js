const mongoose = require("mongoose")

const Schema=mongoose.Schema;

const dataSchema=new Schema(
    {
        links:{
            type:Object,
            required:true
        },
        user:{
            type:String,
            required:false
        }
    },{
        timestamps:true
    }
)

module.exports=mongoose.model("Links",dataSchema);