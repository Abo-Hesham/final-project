const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const {Comment ,validateComment} = require('../models/Comments')
const {HistoricalSite} = require('../models/HistoricalSites')
const {User} = require('../models/users')

/**
 * @desc Add Comment
 * @route /api/Hiss/comment
 * @method POST
 * @access private
 */
router.post('/comment' ,asyncHandler( async(req,res)=>{
    const {HisId , content ,userId} = req.body;
    const {error} = validateComment(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    const comment = new Comment({
        User:userId,
        HisId:HisId,
        Content:content
    });
    const result = await comment.save();
    await HistoricalSite.findByIdAndUpdate(HisId, {
        $push:{
            comments:result
        }
    },{new:true});
    await User.findByIdAndUpdate(userId,{
        $push:{
            Comments:result
        }
    },{new:true})
    res.status(201).json({message:"Commented Successfully" , result})
}))
/**
 * @desc Get His Comments
 * @route /api/Hiss/comment/:id
 * @method GET
 * @access private
 */
router.get('/comment/:id', asyncHandler(async(req,res)=>{
    const comments = await Comment.find({HisId:req.params.id}).
    populate({
        path:"User",
        select:"userImage aboutMe username Location dateOfBrith createdAt"
    })
    res.status(200).json(comments);
}))


module.exports = router