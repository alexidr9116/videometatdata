const { validationResult } = require("express-validator");
 
const VideoMetadata = require("../models/VideoMetadata");
const VideoCreatedBy = require("../models/VideoCreated");
const createSeedData  = async(req,res)=>{
    await VideoCreatedBy.insertMany([
        {createdBy:'user-1', videoId:'video-1'},
        {createdBy:'user-1', videoId:'video-2'},
        {createdBy:'user-1', videoId:'video-3'},
        {createdBy:'user-2', videoId:'video-4'},
        {createdBy:'user-2', videoId:'video-5'},
        {createdBy:'user-3', videoId:'video-6'},
        {createdBy:'user-3', videoId:'video-7'},
        {createdBy:'user-4', videoId:'video-8'},
        {createdBy:'user-4', videoId:'video-9'},
    ]);
    await VideoMetadata.insertMany([
        {videoId:'video-1',videoSize:120,viewCount:1100},
        {videoId:'video-2',videoSize:100,viewCount:100},
        {videoId:'video-3',videoSize:12.2,viewCount:100},
        {videoId:'video-4',videoSize:12,viewCount:200},
        {videoId:'video-5',videoSize:80.2,viewCount:400},
        {videoId:'video-6',videoSize:70.6,viewCount:120},
        {videoId:'video-7',videoSize:140,viewCount:110},
        {videoId:'video-8',videoSize:110,viewCount:900},
    ])
}
const getUploadedSize =async (req,res)=>{
    try{
        const data = await VideoMetadata.aggregate([
            
            {
                $lookup:{
                    from:"videocreateds",
                    localField:"videoId",
                    foreignField:"videoId",
                    as:"created"
                }
            },
            {
                $match:{
                    "created.createdBy":req.params.createdBy
                }
            },
            {
                $group:{
                    _id:'$videoId',
                    uploadedSize:{$sum: '$videoSize'}
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
    updateVideoMetadata,
    createSeedData
}