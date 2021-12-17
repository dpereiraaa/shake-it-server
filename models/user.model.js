const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
  user_posts: [{ type: Schema.Types.ObjectId, ref: "Feed" }],
  favorite_drinks: [{ type: String }],
});

const User = model("User", userSchema);

module.exports = User;
