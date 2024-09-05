const mongoose = require('mongoose');
const Joi = require('joi')

const commentSchema = new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    HisId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"HistoricalSite"
    },
    Content:{
        type:String,
        required:true
    }
},{timestamps:true})

function validateComment(obj){
    const schema = Joi.object({
        userId: Joi.required(),
        HisId:Joi.required(),
        content:Joi.string().trim().min(1).max(100).required(),
    })
    return schema.validate(obj)
}

const Comment = mongoose.model("Comment" ,commentSchema);

module.exports={
    Comment,
    validateComment
}