const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");

// GET /api/users/current  - Get current user info
router.get("/api/users/current", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;
    const user = await User.findById(currentUser._id).populate({
      path: "user_posts",
      model: "Feed",
    });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/current  - Update the current user
router.put("/api/users/current", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;
    const { email, name, image, favorite_drinks } = req.body;

    const favoriteDrinkId = await User.findOne({ favorite_drinks });

    if (favoriteDrinkId) {
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { email, name, image, $push: { favorite_drinks } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
