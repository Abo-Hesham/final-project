const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Rating } = require('../models/Rating');
const multer = require('multer');
const path = require('path');
const { HistoricalSite } = require('../models/HistoricalSites');
const {Governorate} = require('../models/governorate')
const {User} = require('../models/users')



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../HistoricalSitesImages"));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).array('files', 10); // 'files' is the field name, and 10 is the max count

/**
 * @desc upload New Post
 * @route /api/Historical/upload
 * @method POST
 * @access private (only admins)
 */
router.post('/upload', upload, asyncHandler(async (req, res) => {
    const His_Site = new HistoricalSite({
        GovId: req.body.GovId,
        Name: req.body.Name,
        Desc: req.body.Desc,
        ReadMore: req.body.ReadMore,
        Images: req.files.map(file => file.filename) // Store filenames in an array
    });
    const result = await His_Site.save();
    await Governorate.findByIdAndUpdate(req.body.GovId ,{
        $push:{
            HisSite: result
        }
    })
    res.status(201).json({ message: "Uploaded Successfully", result });
}));

/**
 * @desc Rate a Historical Site
 * @route /api/Historical/Rate
 * @method POST
 * @access public
 */
router.post('/Rate', asyncHandler(async (req, res) => {
    const { userId, HisId, value } = req.body;

    try {
        // Check if there is an existing rating
        const existingRate = await Rating.findOne({ User: userId, HisId: HisId });

        if (existingRate) {
            // Update existing rating value
            existingRate.Value = value;
            const updatedRate = await existingRate.save();

            // Remove old rating from User and HistoricalSite schemas
            await User.findByIdAndUpdate(userId, {
                $pull: { Ratings: existingRate._id }
            });
            await HistoricalSite.findByIdAndUpdate(HisId, {
                $pull: { Rating: existingRate._id }
            });

            // Add updated rating to User and HistoricalSite schemas
            await User.findByIdAndUpdate(userId, {
                $push: { Ratings: updatedRate._id }
            });
            await HistoricalSite.findByIdAndUpdate(HisId, {
                $push: { Rating: updatedRate._id }
            });

            return res.status(201).json({ message: 'Rating updated successfully', rate: updatedRate });
        }

        // If no existing rate, create a new rating
        const newRating = new Rating({ User: userId, HisId: HisId, Value: value });
        const rate = await newRating.save();

        // Update HistoricalSite and User schemas with new rating
        await HistoricalSite.findByIdAndUpdate(HisId, { $push: { Rating: rate } }, { new: true });
        await User.findByIdAndUpdate(userId, { $push: { Ratings: rate } }, { new: true });

        res.status(201).json({ message: 'Rated Successfully', rate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}));

/**
 * @desc Get User Rating Of The His
 * @route /api/His/UserRate
 * @method GET
 * @access private
 */

module.exports = router;
