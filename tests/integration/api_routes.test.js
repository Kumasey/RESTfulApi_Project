const express = require('express');
const mongoose = require("mongoose");
const model = require('../../models/contactModel')
const apiRoutes = require('../../routes/api_routes');
const supertest = require('supertest');


const app = express();
app.use(express.json());
app.use('/api/', apiRoutes);

beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/rest_Practice",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });
  
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("GET /api", async () => {
    await supertest(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        // Check type
        expect(Object(response.body)).toBeTruthy();
        // check data 
        expect(response.body).toEqual(expect.objectContaining({
          "message": "Welcome to restPractice!", "status": "API is working"
        }));
      });
  });

  test("GET /api/contacts", async () => {
    const post = await model.create({
       name: "Kingsley",
       gender: "Male",
       email: "kkkkkk@gmail.com",
       phone: "4154555784"});
  
    await supertest(app)
      .get("/api/contacts")
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(Array.isArray(response.body.data)).toBeTruthy();
        expect(response.body.data.length).toEqual(1);
        // Check data
        expect(response.body.data[0]._id).toBe(post.id);
        expect(response.body.data[0].name).toBe(post.name);
        expect(response.body.data[0].gender).toBe(post.gender);
      });
  });

  test("GET /api/contacts/:contact_id", async () => {
    const post = await model.create({
       name: "Helen",
       gender: "Female",
       email: "kkkkkk@gmail.com",
       phone: "4154555784"});
  
    await supertest(app)
      .get("/api/contacts/" + post.id)
      .expect(200)
      .then((response) => {
        expect(response.body.data._id).toBe(post.id);
        expect(response.body.data.name).toBe(post.name);
        expect(response.body.data.gender).toBe(post.gender);
        expect(response.body.data.email).toBe(post.email);
        expect(response.body.data.phone).toBe(post.phone);
      });
  });

  test("POST /api/contacts", async () => {
    const data = {
       name: "Michael",
       gender: "Male",
       email: "kkkkkk@gmail.com",
       phone: "4154555784",
      }
        
      await supertest(app)
        .post("/api/contacts")
        .send(data)
        .expect(200)
        .then(async(response) => {
         // Check the response
         expect(response.body.data._id).toBeTruthy();
         expect(response.body.data.name).toBe(data.name);
         expect(response.body.data.gender).toBe(data.gender);
         expect(response.body.data.email).toBe(data.email);
         expect(response.body.data.phone).toBe(data.phone);

        // Check the data in the database
        const post = await model.findOne({ _id: response.body.data._id })
        expect(post).toBeTruthy()
        expect(post.name).toBe(data.name)
        expect(post.gender).toBe(data.gender)
       })
  });
  
  test("PATCH /api/contacts/:contact_id", async () => {
    const post = await model.create({
       name: "Michael",
       gender: "Male",
       email: "kkkkkk@gmail.com",
       phone: "4154555784",
    })
  
    const data = {
       name: "New Michael",
       gender: "Male",
       email: "new@gmail.com",
       phone: "4154555784",
    }
  
    await supertest(app)
      .patch("/api/contacts/" + post.id)
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.data._id).toBeTruthy()
        expect(response.body.data.name).toBe(data.name)
        expect(response.body.data.gender).toBe(data.gender)
  
        // Check the data in the database
        const newPost = await model.findOne({ _id: response.body.data._id })
        expect(newPost).toBeTruthy()
        expect(newPost.name).toBe(data.name)
        expect(newPost.gender).toBe(data.gender)
        expect(newPost.email).toBe(data.email)
        expect(newPost.phone).toBe(data.phone)
      })
  })

  test("DELETE /api/contacts/:contact_id", async () => {
    const post = await model.create({
       name: "New name",
       gender: "Male",
       email: "updated@gmail.com",
       phone: "4154555784",
    })
  
    await supertest(app)
      .delete("/api/contacts/" + post.id)
      .expect(200)
      .then(async () => {
        expect(await model.findOne({ _id: post.id })).toBeFalsy()
      })
  })