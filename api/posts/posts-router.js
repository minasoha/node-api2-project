// implement your posts router here
const express = require("express");
const Posts = require("./posts-model");
const router = express.Router();

router.get("/", async (req, res) => {
 Posts.find(req.query)
  .then((post) => {
   res.status(200).json(post);
  })
  .catch((err) => {
   res.status(500).json({
    message: "The posts information could not be retrieved",
    err: err.message,
   });
  });
});

router.get("/:id", async (req, res) => {
 const { id } = req.params;
 const post = await Posts.findById(id);

 try {
  if (!post) {
   res
    .status(404)
    .json({ message: "The post with the specified ID does not exist" });
  } else {
   res.json(post);
  }
 } catch (err) {
  res
   .status(500)
   .json({ message: "The post information could not be retrieved" });
 }
});

router.post("/", (req, res) => {
 const { title, contents } = req.body;
 if (!title || !contents) {
  res.status(400).json({
   message: "Please provide title and contents for the post",
  });
 } else {
  Posts.insert({ title, contents })
   .then(({ id }) => {
    return Posts.findById(id);
   })
   .then((post) => {
    res.status(201).json(post);
   })
   .catch((err) => {
    res.status(500).json({
     message: "There was an error while saving the post to the database",
     err: err.message,
    });
   });
 }
});
module.exports = router;
