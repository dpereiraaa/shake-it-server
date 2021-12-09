const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const { isAuthenticated } = require("./../middleware/jwt.middleware");

router.post(
  "/api/add-post-comment/:postId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { comment_description } = req.body;
      const postId = req.params.postId;

      const comment = await Comment.create({
        comment_author: req.payload._id,
        comment_description,
      });

      await Post.findByIdAndUpdate(postId, {
        $push: { comments: comment._id },
      });
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
