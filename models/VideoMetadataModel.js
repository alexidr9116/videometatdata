const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema

const VideoMetadataSchema = new Schema({
    title:{type:String, default:""},
    description:{type:String,default:""},
    tags:{type:String,default:""},
    viewCount:{type:Number,default:0},
    // stream schema

    codecName:{type:String,default:"h264"},
    codecLongName:{type:String,default:"H.254/AVC/MPEG-4 AVC"},
    codecType:{type:String,default:""},
    codecTagString:{type:String,default:"avc1"},
    width:{type:Number},
    height:{type:Number},
    colorRange:{type:String,default:"tv"},
    rFrameRate:{type:Number,default:30},
    timeBase:{type:Number,default:12800},
    bitRate:{type:Number},
    tsDuration:{type:Number,default:0},
    duration:{type:Number,default:0},
    // file schema
    fileName:{type:String,default:""},
    fileSize:{type:Number,default:0},
    fileType:{type:String,default:"mp4"},
    mimeType:{type:String,default:"video/mp4"},
    created:{type:Number,default:Date.now()},
    updated:{type:Number,default:Date.now()},
 
    status:{type:String,default:"active",enum:["active","inactive"]},
    creator:{type:mongoose.Types.ObjectId,ref:"users"},
    createdAt:{type:Date, default:Date.now()},
    updatedAt:{type:Date,default:Date.now()},
     

});
class VideoMetadataClass {
    static async isExistForModify(id){
        const data = await this.findOne({_id:{$ne:id}});
        return (data && data!=null);
    }
    

}
VideoMetadataSchema.loadClass(VideoMetadataClass);
const VideoMetadata = mongoose.model("VideoData",VideoMetadataSchema);
module.exports = VideoMetadata;