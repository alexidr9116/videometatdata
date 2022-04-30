const { validationResult } = require("express-validator");
const User = require("../models/UserModel");
const VideoMetadata = require("../models/VideoMetadata");
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require("fs");
const ResponseData = require("../utils/ResponseData");
const createSeedData  = async(req,res)=>{

}
const getUploadedSize =async (req,res)=>{
    try{
        const data = await VideoMetadata.aggregate([
            {
                $match:{
                    createdBy:req.params.createdBy
                }
            },
            {
                $lookup:{
                    from:"videocreated",
                    localField:"videoId",
                    foreignField:"videoId",
                    as:"createdBy"
                }
            },
            {
                $group:{
                    _id:{videoId},
                    uploadedSize:{$sum: videoSize}
                }
            }
        ])

        res.status(200).json(data);
        
    }
    catch(err){
        console.log(err);
        res.status(201).json(err);
    }

}
const getVideoMetadata = async (req,res)=>{
    try{

        const data = await VideoMetadata.aggregate([
            {$match:{videoId:(req.body.id)}},
            {$lookup:{from:"videocreated",localField:"videoId",foreignField:"videoId",as:"createdBy"}},
            {$unwind:"$createdBy"},
            {$project:{viewCount:1,videoSize:1,createdBy:1}}
        ])
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(201).json(err);
    
    }


} 
const updateVideoMetadata = async (req,res)=>{
    var result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(201).json({err:result});
    }
    try{
        const {viewCount, videoSize, id} = req.body;
        const data = await VideoMetadata.findOneAndUpdate(
        {
            videoId:id
        },
        {
            viewCount,videoSize
        });
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(201).json(err);
    }
}
module.exports = {
    getUploadedSize,
    getVideoMetadata,
    updateVideoMetadata
}