const request  = require('supertest');
const app = require('./server');


describe("post /update",()=>{
    test("should response with a 200 status code",async()=>{
        const response = await request(app).post("/api/video/update-metadata").send({
            viewCount:10,
            fileSize:12.4,
            id:""
        })
        expect(response.statusCode).toBe(200);
    })
});
describe("get /get-size-by-user/:usernameOrEmailOrMobile",()=>{
    test("should response with a 200 status code",async()=>{
        const response = await request(app).get("/api/video/get-size-by-user/username").send({
            creator:""
        })
        expect(response.statusCode).toBe(200);
    })
})

describe("get /get-metadata-by-id/:id",()=>{
    test("should response with a 200 status code",async()=>{
        const response = await request(app).get("/api/video/get-metadata-by-id/123456789012");
        expect(response.statusCode).toBe(200);
    })
})