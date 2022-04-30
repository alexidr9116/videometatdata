const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); 
const cors = require("cors");

const path = require("path");
require("dotenv").config();
// api routers
const videoRoute = require('./routes/api/VideoData');
 

const app = express();
// Bodyparser middleware
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(bodyParser.raw());
// DB Config
const DATABASE_CONNECTION = process.env.DATABASE_ATLAS_URL;
// Connect to MongoDB
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
    //ssl:true,
}
mongoose
    .connect(
        DATABASE_CONNECTION,
        option
    )
    .then(() => {
        // console.log("MongoDB successfully connected")
    })
    .catch(err => console.log(err));

const assetFolder = path.resolve(__dirname, './build/');
const uploadsFolder = path.resolve(__dirname, './uploads/');
// Passport middleware 
// Passport config 
// Routes
app.use("/api/video/", videoRoute);
  
const port = process.env.PORT || 5555; // process.env.port is Heroku's port if you choose to deploy the app there
const server = app.listen(port, () => {
    // console.log(`Server up and running on port ${port} !`)

});
module.exports = app;