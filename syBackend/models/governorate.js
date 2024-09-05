const mongoose = require('mongoose');


const governorateSchema = new mongoose.Schema({
    GovName:{
        type:String,
        required:true
    },
    HisSite:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"HistoricalSite"
    }]
})
const Governorate = mongoose.model("Governorate" , governorateSchema);

module.exports ={
    Governorate
}