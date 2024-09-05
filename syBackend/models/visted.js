const mongoose = require('mongoose')


const visitSchema = new mongoose.Schema({

    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    HisSite:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"HistoricalSite"
    },
    Visted:{
        type:Boolean,
    }
})
const Visited = mongoose.model("Visited" , visitSchema)

module.exports = {Visited}