//Authentication for user registration and login
const express = require("express");
const router= express.Router();
const asyncHandler = require("express-async-handler");
const {ValidateLonginUser , ValidateRegisterUser , User} = require("./../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @desc Regsiter New User
 * @route /api/auth/register
 * @method POST
 * @access public
 */
router.post("/register" , asyncHandler(async (req,res)=>{
    const {error} = ValidateRegisterUser(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({message: "This User Is Already Registered"})
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password , salt);
    user = new User({
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
    })
    const result = await user.save();
    const token = jwt.sign({ id:user._id} , process.env.JWT_SECRET_KEY);
    const { password , ...other} = result._doc;
    res.status(201).json({message:"Registerer Successfully",...other , token});
}))

/**
 * @desc Login User
 * @route /api/auth/login
 * @method POST
 * @access public
 */

router.post("/login",asyncHandler( async (req,res)=>{
    const {error} = ValidateLonginUser(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    let user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({message: "invalid email or password"});
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password , user.password);
    if(!isPasswordMatch){
        return res.status(400).json({message: "invalid email or password"});
    }
    const token = jwt.sign({id: user._id , isAdmin:user.isAdmin} , process.env.JWT_SECRET_KEY);
    const {password , ...other} = user._doc;
    res.status(200).json({...other , token});
}))
module.exports= router