const mongoose = require("mongoose");
const Joi = require("joi");

// User Schema
const userSchema = new mongoose.Schema(
    {
        email:
        {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 4,
        maxlength: 100
        },
        username:
        {
            type:String,
            required:true,
            trim:true,
            minlength:4,
            maxlength:20
        },
        password:
        {
            type:String,
            required:true,
            minlength:8
        },
        dateOfBrith:
        {
            type:Date,
            required:false
        },
        Location:
        {
            type:String,
            required:false
        },
        userIamage:{
            type:String,
            required:false
        },
        aboutMe:{
            type:String,
            required:false,
            maxlength:40
        },
        Comments:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }],
        Ratings:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Rating'
        }]
    },
    {
        timestamps: true
    }
)
// Validate Register User
function ValidateRegisterUser (obj) {
    const schema = Joi.object({
        email:Joi.string().trim().min(4).max(100).required().email(),
        username:Joi.string().trim().min(4).max(20).required(),
        password:Joi.string().min(8).required(),
    });
    return schema.validate(obj);
}
// Validate Login User
function ValidateLonginUser(obj) {
    const schema = Joi.object({
        email:Joi.string().trim().min(4).max(100).required().email(),
        password:Joi.string().min(8).required()
    })
    return schema.validate(obj);
}

// Validate Update User
function validateUpdateUser(obj) {
    const schema = Joi.object({
        email:Joi.string().trim().min(4).max(100).email(),
        username:Joi.string().trim().min(4).max(20),
        password:Joi.string().min(8),
        phone:Joi.number().min(10),
        address:Joi.string().min(5),
        aboutme:Joi.string().min(1).max(40),
        brith:Joi.string()
    })
    return schema.validate(obj);
}

//User Model
const User = mongoose.model("User" , userSchema);

// Export The Functions and UserSchema
module.exports={
    User,
    validateUpdateUser,
    ValidateLonginUser,
    ValidateRegisterUser
}