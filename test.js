const request  = require('supertest');
const app = require('server');


describe("post /update",()=>{
    test("should response with a 200 status code",async()=>{
        const response = await request(app).post("/api/video/update-metadata").send({
            viewCount:10,
            fileSize:12.4,
            id:""
        })
        expect(response.statusCode).toBe(200);
    })
})