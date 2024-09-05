const express = require("express");
const { default: mongoose } = require("mongoose");
const {notFound ,errorHandler} = require("./middlewares/errorHandler")
const {logger} = require("./middlewares/logger");
const cors = require("cors")
require("dotenv").config();
const path = require('path');

//Init App
const app = express();
mongoose.set('strictQuery',false)
//Apply Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(logger);// A middleware to show the request method & host & original URL
app.use(express.static(path.join(__dirname, "HistoricalSitesImages")))
app.use(express.static(path.join(__dirname, "usersImage")));


//Routes
app.use('/api/auth',require('./routes/auth')); // Auth Path
app.use('/api/Hiss' , require('./routes/Comments')); //Comments Path
app.use('/api/Gov' , require('./routes/Gov')); //Governorate Path
app.use('/api/Historical', require('./routes/Historical')); //Historical Path
app.use('/api/users', require('./routes/user'))
//Error Handler Middleware
app.use(notFound);
app.use(errorHandler);


//Running The Server
const PORT = 4400

const start = async()=>{
        try {
            await mongoose.connect('mongodb://localhost:27017/syria');
            app.listen(PORT , ()=> console.log(`Server is running at PORT: ${PORT}`))
        } catch (error) {
            console.log(error.message)
        }
}

start()