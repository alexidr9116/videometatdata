const axios = require('axios')
const BOX_API_URL = process.env.BOX_API_URL;

const setOpenCodeWithMobile = async(cabinetId, boxNo, openCode11, pwd, appKey, isOpen = 0) => {
    const data = {
        cabinetId,
        boxNo,
        openCode11: `976${openCode11}`,
        pwd,
        appKey,
        timestamp: Date.now(),
        effectFlag: 1,
        isOpen,
    };
    try {
        const response = await axios.post(`${BOX_API_URL}setOpenCode`, data);
        return response;
    } catch (err) {
        return { data: { code: 400, err } }
    }
}
const clearOneBox = async(cabinetId, boxNo, appKey) => {
    const data = {
        cabinetId,
        boxNo,
        appKey,
        timestamp: Date.now(),
        isOpen: 0,
    }
    try {
        const response = await axios.post(`${BOX_API_URL}clearOneBox`, data);
        return response;
    } catch (err) {
        return { data: { code: 400, err } }
    }
}
const openOneBox = async(cabinetId, boxNo, appKey) => {
    const data = {
        cabinetId,
        boxNo,
        appKey,
        timestamp: Date.now()
    }

    try {
        const response = await axios.post(`${BOX_API_URL}openOneBox`, data);
        return response;
    } catch (err) {
        return { data: { code: 400, err } }
    }
}

const checkCabinet = async(cabinetId, appKey) => {
    const data = {
        cabinetId,
        appKey,
        timestamp: Date.now()
    }
    try {
        const response = await axios.post(`${BOX_API_URL}chkDevice`, data);
        return response;
    } catch (err) {
        return { data: { code: 400, err } }
    }
}
module.exports = { setOpenCodeWithMobile, openOneBox, clearOneBox, checkCabinet }