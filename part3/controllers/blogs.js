const blogsRouter = require("express").Router();
const Blogs = require("../models/Blogs");

blogsRouter.get("/", (request, response) => {
  Blogs.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
  console.log(request.body);
  const blog = new Blogs(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogsRouter;
