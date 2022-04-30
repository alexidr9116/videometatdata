const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoMetadataSchema = new Schema({
    videoId:{type:String,default:""},
    videoSize:{type:Number,default:0},
    viewCount:{type:Number,default:0},
});  
const VideoMetadata = mongoose.model("VideoMetadata",VideoMetadataSchema);
module.exports = VideoMetadata;