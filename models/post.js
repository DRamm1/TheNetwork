/* This is destructuring the mongoose module. */
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

/* This is creating a schema for the thought model. */
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

/* This is creating a schema for the thought model. */
const thoughtSchema = new Schema(
  {
    thoughtText: {
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
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

/* This is creating a model called thought and exporting it. */
const thought = model("thought", thoughtSchema);

/* This is exporting the thought model. */
module.exports = thought;
