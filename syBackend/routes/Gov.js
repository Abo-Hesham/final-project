const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { HistoricalSite } = require('../models/HistoricalSites');
const {Governorate} = require('../models/governorate')


/**
 * @desc Get All Governorate
 * @route /api/Gov/
 * @method GET
 * @access private
 */
router.get('/', asyncHandler( async (req,res)=>{
    const Gov  = await Governorate.find();
    res.status(200).json(Gov)
}))



/**
 * @desc POST New Governorate
 * @route /api/Gov/upload
 * @method POST
 * @access private
 */
router.post('/upload', asyncHandler( async (req,res)=>{
    const {name} = req.body;
    const gov = new Governorate({
        GovName: name
    });
    const result = await gov.save();
    res.status(201).json({message:" uploaded Successfully", result})
}))




/**
 * @desc Get His Site Of Gov
 * @route /api/Gov/HisSite/:id
 * @method GET
 * @access public
 */
router.get('/HisSite/:id', asyncHandler(async (req, res) => {
    try {
        const historicalSites = await HistoricalSite.find({ GovId: req.params.id }).populate({
            path: "comments",
            select: 'User Content',
            populate: {
                path: 'User',
                model: 'User',
                select: 'userImage aboutMe username Location dateOfBrith createdAt'
            },
        }).populate({
            path: "Rating",
            select: 'Value'
        });

        const sitesWithRatings = historicalSites.map(site => {
            const count = site.Rating.length;
            const ratingsValue = site.Rating.reduce((acc, rating) => acc + rating.Value, 0);
            const totalRate = count > 0 ? ratingsValue / count : 0;
            return {
                ...site.toObject(),  // Converts Mongoose document to plain JS object
                totalRates: totalRate
            };
        });

        res.status(200).json(sitesWithRatings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
module.exports = router