const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoCreatedSchema = new Schema({
    createdBy:{type:String,default:""},
    videoId:{type:String,default:""},
    
});  
const VideoCreated = mongoose.model("VideoCreated",VideoCreatedSchema);
module.exports = VideoCreated;