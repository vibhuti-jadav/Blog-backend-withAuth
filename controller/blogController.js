import httpError from "../middleware/errorHandling.js"
import blogAuth from "../model/blogModel.js";


const addBlog = async(req,res,next)=>{

    try {

        const {headline , description , author , published , createdAt } = req.body;

        const newData = {
            headline,
            description,
            author,
            published,
            createdAt,
        }

        const savedata = new blogAuth(newData)

        await savedata.save()

        if(!savedata){
            return next(new httpError("blog can't addedd",400))
        }

        res.status(201).json({message:"blog detailed saved successfully",savedata})

    } catch (error) {
        next(new httpError(error.message))
    }
}

const allblog = async(req,res,next)=>{
    try {
        
        const allData = await blogAuth.find({})

        if(!allData){
            return next(new httpError("blog not find",400))
        }

        res.status(200).json({message:"all blog find sucessfullyy",allData})

    } catch (error) {
        next(new httpError(error.message))
    }
}

const specificBlog = async(req,res,next)=>{
    try {
        
        const id = req.params.id;

        const  existingTask = await blogAuth.findById(id)

        if(!existingTask){
            return next(new httpError("blog data not found",404))
        }

        res.status(200).json({message:"blog data found",existingTask})

    } catch (error) {
        next(new httpError(error.message,400))        
    }
}

const updateBlog = async(req,res,next)=>{
    try {
        const id = req.params.id;

        const existingTask = await blogAuth.findById(id)

        if(!existingTask){
            return next (new  httpError("id not found for updated",404))
        }

        const updates = Object.keys(req.body)

        const allowfield = ["headline" , "description","author","published","createdAt"]

        const isValidUpdate = updates.every((field)=>allowfield.includes(field))

        if(!isValidUpdate){
            return next(new httpError("only allowed field can be updated",400))
        }

        updates.forEach((update)=>{
            existingTask[update]=req.body[update]
        })

        await existingTask.save()

        res.status(200).json({message:"task updated succesfullyy",existingTask})

    } catch (error) {
        next(new httpError(error.message))
    }
}

const deleteBlog = async(req,res,next)=>{

    try {

        const id = req.params.id;

        const savedata = await blogAuth.findByIdAndDelete(id)

        if(!savedata){
            return next(new httpError("blog not found"))
        }

        res.status(200).json({message:"blog information successfully deleted"})

    } catch (error) {
        next(new httpError(error.message))
    }
    
}

export default {addBlog ,  allblog , specificBlog , updateBlog , deleteBlog}