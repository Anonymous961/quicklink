const mongoose = require("mongoose")

const Schema=mongoose.Schema;

const dataSchema=new Schema(
    {
        title:{
            type:String,
            required:true
        },
        links:{
            type:Object,
            required:true
        },
        description:{
            type:String,
            required:false
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