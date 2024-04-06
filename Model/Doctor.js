const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema(
        {
            userId:{
                type:String
            },
            firstName : {
                type : String,
                required : [true,"first name is required"]
            },
            lastName : {
                type : String,
                required : [true,"lastname is required"]
            },
            phone:{
                type : String,
                required : [true,"phone no. is required"]
            },
            email:{ 
                type : String,
                required : [true,"email is required"]
            },
            website:{
                type : String,
            },
            address:{
                type : String,
                required : [true,"address is required"]
            },
            specialisation:{
                type : String,
                required : [true,"specialisation is required"]
            },
            experience:{
                type : String,
                required : [true,"experience is required"]
            },
            fees:{
                type : Number,
                required : [true,"fees is required"]
            },
            timing:{
                type : Object,
                required : [true,"timing is required"]
            }
        },
        {timestamps:true}
    )

const doctorModel = mongoose.model('user',doctorSchema);
module.exports = doctorModel;