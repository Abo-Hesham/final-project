const mongoose = require('mongoose');



const HistoricalSchema = new mongoose.Schema({
    GovId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Governorate"
    }
    ,
    Name:{
        type:String,
        required:true,
    },
    Desc:{
        type:String,
        required:true
    },
    ReadMore:{
        type:String,
        required:true
    },
    Images:[{
        type:String,
        required:true
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    Rating:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Rating"
    }],
    totalRates:{
        type:Number,
        default:0
    },
    Visited:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Visited'
        }]
})
const HistoricalSite = mongoose.model("HistoricalSite" , HistoricalSchema);
module.exports = {
    HistoricalSite
}