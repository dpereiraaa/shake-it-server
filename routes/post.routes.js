const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const { isAuthenticated } = require("./../middleware/jwt.middleware");

router.post(
  "/api/create-post",
  fileUploader.single("picture"),
  async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const cloudinaryFile = req.file.path;

      const post = await Post.create({
        title,
        description,
        picture: cloudinaryFile,
        post_author: req.session.user._id,
      });
      await User.findByIdAndUpdate(req.payload._id, {
        $push: { user_posts: post._id },
      });

      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/api/delete-post/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    await Post.findByIdAndRemove(postId);
    res.status(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
