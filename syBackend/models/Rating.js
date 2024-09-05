const mongoose = require('mongoose');


const RatingSchema =new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    HisId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'HistoricalSite'
    },
    Value:{
        type:Number,
        required:true
    },

}, {
    timestamps:true
})

const Rating = mongoose.model('Rating' , RatingSchema);

module.exports= {
    Rating
}