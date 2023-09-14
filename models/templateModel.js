import mongoose from "mongoose";

const templateSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true
    },
    variables:[
        {
            type:String
        }
    ],
    clubName:{
        type:String,
        required:true,
        unique:true   
    },
    subscribers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ]
},{
    timestamps:true
})

const Template = mongoose.model('templates', templateSchema)

export default Template