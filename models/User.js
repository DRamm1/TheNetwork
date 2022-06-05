/* This is destructuring the mongoose module. */
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

/* This is creating a schema for the User model. */
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address!"],
    },
    thought: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friend: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

/* This is creating a virtual property called friendCount. This is a getter function that returns the
length of the friend array. */
UserSchema.virtual("friendCount").get(function () {
  return this.friend.length;
});

/* This is creating a model called User using the UserSchema. */
const User = model("User", UserSchema);

/* This is exporting the User model. */
module.exports = User;
