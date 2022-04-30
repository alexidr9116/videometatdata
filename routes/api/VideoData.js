const express = require("express");
const router = express.Router();
const VideoController = require('../../controller/VideoController'); 
const validator = require("../../validation");
router.get(
    '/get-size-by-user/:creator',
    VideoController.getUploadedSize
)
router.get(
    '/get-metadata-by-id/:id',
    VideoController.getVideoMetadata
)
router.post(
    '/update-metadata', 
    [
        validator.reqStringValidator('id'),
        validator.reqNumberValidator('viewCount'),
        validator.reqNumberValidator('fileSize'),
    ],
    VideoController.updateVideoMetadata,
)
 
module.exports = router;