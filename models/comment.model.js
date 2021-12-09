const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    comment_author: { type: Schema.Types.ObjectId, ref: "User" },
    comment_description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
