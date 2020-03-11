//always import
const express = require("express");

//Import the database
const db = require("../data/db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let posts = await db.find();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let posts = await db.findById(req.params.id);
    if (posts.length === 0) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      const post = posts[0];
      res.status(200).json(post);
    }
  } catch {
    res.status(500).json({
      error:
        "Internal server error. The posts information could not be retrieved."
    });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    let posts = await db.findById(req.params.id);
    if (posts.length === 0) {
      res.status(404).json({
        message: `The comments with the ID ${req.params.id} does not exist.`
      });
    } else {
      let comments = await db.findPostComments(req.params.id);
      if (comments.length > 0) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({
          error: `Could not find any comments for post id ${req.params.id}.`
        });
      }
    }
  } catch {
    res
      .status(500)
      .json({ error: "The comments information could not be retrieved." });
  }
});

router.put("/:id", async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    try {
      await db.update(req.params.id, req.body);
      let posts = await db.findById(req.params.id);
      res.status(200).json(posts[0]);
    } catch {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    }
  }
});

//Export the router for the server.js
module.exports = router;
