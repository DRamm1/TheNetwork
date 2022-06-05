/* This is destructuring the mongoose module. */
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

/* This is creating a schema for the post model. */
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

/* This is creating a schema for the post model. */
const postSchema = new Schema(
  {
    postText: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 270,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reaction: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

/* This is creating a virtual property called reactionCount. This is a getter function that returns the
length of the reaction array. */
postSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

/* This is creating a model called post and exporting it. */
const post = model("post", postSchema);

/* This is exporting the post model. */
module.exports = post;
