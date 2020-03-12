//Import express
const express = require("express");

//Import the router to use as middleware
const postsRouter = require("../posts/posts-router");

//Create the server
const server = express();
server.use(express.json());

//response without routes
server.get("/", (req, res) => {
  res.send(`
    <h2>Blog Post API</h>
    <p>Welcome to my blog post API.</p>
  `);
});

// This router middleware handles endpoints
server.use("/api/posts", postsRouter);

module.exports = server;
