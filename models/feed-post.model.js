const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const feedpostSchema = new Schema(
  {
    title: { type: String, required: true },
    picture: { type: String, required: true },
    description: { type: String, required: true },
    drink_hashtag: { type: String },
    post_author: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

const Feed = model("Feed", feedpostSchema);

module.exports = Feed;
