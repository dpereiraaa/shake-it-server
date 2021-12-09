const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    picture: { type: String, required: true },
    description: { type: String, required: true },
    drink_tag: { type: String },
    post_author: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

module.exports = Post;
