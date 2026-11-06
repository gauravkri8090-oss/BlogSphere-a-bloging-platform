const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    body: {
      type: String,
      required: true
    },

    coverImage: {
      type: String,
      default: ""
    },

    coverImageId: {
      type: String,
      default: ""
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);