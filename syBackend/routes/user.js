const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {User} = require('../models/users')
const {validateUpdateUser} = require("../models/users")



/**
 * @desc Get User By Id
 * @route /api/users/:id
 * @method GET
 * @access private (only admin & user himself)
 */
router.get("/:id",asyncHandler( async (req,res)=>{
    const user = await User.findById(req.params.id).select("-password")
    if(user){
        res.status(200).json(user);
    } else {
        res.status(404).json({message:"User not found"})
    }
}))




const storage = multer.diskStorage({
    destination: function(req, file ,cb){
        cb(null , path.join(__dirname , '../usersImage'))
    },
    filename:function(req ,file , cb){
        cb(null , file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage}).single('file');



/**
 * @desc Update Email & password
 * @route /api/users/:id
 * @method PUT
 * @access private
 */
router.put("/:id", upload ,asyncHandler( async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash( req.body.password , salt );
    }

    if(req.file){
       if(user.userImage){
        fs.unlink(path.join(__dirname, "../usersImage", user.userImage), (err) => {
            if (err) {
                console.error("Error deleting image:", err);
            }
        });
        
       }
    const updatedUser = await User.findByIdAndUpdate(req.params.id , {
        $set:{
            userImage:req.file.filename
        }
    } , { new: true }).select("-password");

    return res.status(200).json(updatedUser);
}
}))


/**
 * @desc Update UserName
 * @route /api/users/userdata/:id
 * @method PUT
 * @access private
 */
router.put('/userdata/:id'  , asyncHandler( async(req,res)=>{
   /* if(req.user.id !== req.params.id){
        return req.status(403).json({message: "You're not allowed , You only can update your profile ;) "})
    }*/
   {/* const {error} = validateUpdateUser(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }*/}
     try {
        await User.findByIdAndUpdate(req.params.id , {
            $set:{
                username:req.body.username,
                aboutMe : req.body.aboutme,
                Location:req.body.location,
                dateOfBrith:req.body.brith
            }
        } ,{new:true})
        res.status(200).json({message:"Updated Successfully"})
     } catch (error) {
        console.log(error)
     }
}))


module.exports = router