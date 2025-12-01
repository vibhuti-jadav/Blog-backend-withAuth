
import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({

    headline:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    author:{
        type:String,
        required:true,
        trim:true,
    },
    published:{
        type:Boolean,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        required:true,
        trim:true
    }

})

const blogAuth = mongoose.model("blogAuth" , blogSchema)

export default blogAuth