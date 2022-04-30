const request  = require('supertest');
const app = require('./server');


describe("post /update",()=>{
    test("should response with a 200 status code",async()=>{
        const response = await request(app).patch("/api/video/update-metadata").send({
            viewCount:10,
            videoSize:12.4,
            id:"video-1"
        })
        expect(response.statusCode).toBe(200);
    })
});
describe("get /get-size-by-user/:usernameOrEmailOrMobile",()=>{
    test("should response with a 200 status code",async()=>{
        const response = await request(app).get("/api/video/get-size-by-user/user-1");
        expect(response.statusCode).toBe(200);
    })
})

describe("get /get-metadata-by-id/:id",()=>{
    test("should response with a 200 status code",async()=>{
        const response = await request(app).get("/api/video/get-metadata-by-id/video-1");
        expect(response.statusCode).toBe(200);
    })
})