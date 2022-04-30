const { validationResult } = require("express-validator");
const User = require("../models/UserModel");
const VideoMetadata = require("../models/VideoMetadataModel");
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require("fs");
const ResponseData = require("../utils/ResponseData");

const getUploadedSize =async (req,res)=>{
    try{
        const creator = await User.findByAny(req.params.creator);
        if(creator && creator!=null){
            const data = await VideoMetadata.aggregate([
                {
                    $match:{
                        creator:creator._id
                    }
                },
                {
                    $group:{
                        _id:{creator},
                        uploadedSize:{$sum: fileSize}
                    }
                }
            ])
            ResponseData.ok(res,"",{data});
        }
        else{
            ResponseData.error(res,"Can not find user by Username or email");
        }
    }
    catch(err){
        console.log(err);
        ResponseData.error(res,"Server error",{err});
    }

}
const getVideoMetadata = async (req,res)=>{
    try{

        const data = await VideoMetadata.aggregate([
            {$match:{_id:ObjectId(req.body.id)}},
            {$lookup:{from:"users",localField:"creator",foreignField:"_id",as:"createdBy"}},
            {$unwind:"$createdBy"},
            {$project:{viewCount:1,fileSize:1,createdBy:1}}
        ])
        ResponseData.ok(res,"",{data});
    }
    catch(err){
        console.log(err);
        ResponseData.error(res,"Server error",{err});
    }


} 
const updateVideoMetadata = async (req,res)=>{
    var result = validationResult(req);
    if (!result.isEmpty()) {
        return ResponseData.error(res, "Validation error", result);
    }
    try{
        const {viewCount, fileSize, id} = req.body;
        const data = await VideoMetadata.findByIdAndUpdate(ObjectId(id),
        {
            viewCount,fileSize
        });
        ResponseData.ok(res,"",{data});
    }
    catch(err){
        console.log(err);
        ResponseData.error(res,"Server error",{err});
    }
}
module.exports = {
    getUploadedSize,
    getVideoMetadata,
    updateVideoMetadata

}