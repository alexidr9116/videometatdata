const express = require("express");
const router = express.Router();
const VideoController = require('../../controller/VideoController'); 
const validator = require("../../validation");
router.get(
    '/get-size-by-user/:createdBy',
    VideoController.getUploadedSize
)
router.get(
    '/get-metadata-by-id/:id',
    VideoController.getVideoMetadata
)
router.patch(
    '/update-metadata', 
    [
        validator.reqStringValidator('id'),
        validator.reqNumberValidator('viewCount'),
        validator.reqNumberValidator('videoSize'),
    ],
    VideoController.updateVideoMetadata,
)
 
module.exports = router;