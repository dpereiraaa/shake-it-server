const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Feed = require("../models/feed-post.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/api/allposts", isAuthenticated, async (req, res, next) => {
  try {
    const allposts = await Feed.find({ sort: { createdAt: -1 } })
      .populate({
        path: "post_author",
        model: "User",
      })
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "comment_author",
          model: "User",
        },
      });
    res.status(200).json(allposts);
  } catch (error) {
    next(error);
  }
});

router.post("/api/create-post", isAuthenticated, async (req, res, next) => {
  try {
    const { title, description, image } = req.body;
    // const cloudinaryFile = req.file.path;

    const post = await Feed.create({
      title,
      description,
      image,
      post_author: req.payload._id,
    });
    await User.findByIdAndUpdate(req.payload._id, {
      $push: { user_posts: post._id },
    });

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/api/delete-post/:postId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const postId = req.params.postId;
      await Feed.findByIdAndRemove(postId);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
