import { Schema, Types, model, Document } from "mongoose";
var mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  approval: {
    isApproved: {
      type: Boolean,
    },
    approvedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    rejectedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },

  studentRequest: {
    requestedBy: {
      //student Id
      type: Types.ObjectId,
      ref: "User",
    },
    isAccepted: {
      type: Boolean,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Posts = mongoose.model("Posts", postsSchema);

export default Posts;
