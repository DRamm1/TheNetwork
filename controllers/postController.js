/* This is destructuring the post and user models from the models folder. */
const { post, User } = require("../models");

/* This is the controller for the post model. It contains all the methods that will be used to
manipulate the post model. */
const postController = {
  getAllpost(req, res) {
    post
      .find({})
      .select("-__v")
      .then((dbpostData) => res.json(dbpostData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getpostById({ params }, res) {
    post
      .findOne({ _id: params.id })
      .populate({
        path: "reaction",
        select: "-__v",
      })
      .select("-__v")
      .then((dbpostData) => {
        if (!dbpostData) {
          res.status(404).json({ message: "Nothing found with this ID" });
          return;
        }
        res.json(dbpostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createpost({ params, body }, res) {
    post
      .create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.id },
          { $push: { posts: _id } },
          { new: true, runValidators: true }
        );
      })
      .then((dbpostData) => {
        if (!dbpostdata) {
          res.status(404).json({ message: "Nothing found with this ID" });
          return;
        }
        res.json(dbpostData);
      })
      .catch((err) => res.status(400).json(err));
  },
  updatepost({ params, body }, res) {
    post
      .findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      })
      .then((dbpostData) => {
        if (!dbpostData) {
          res.status(404).json({ message: "Nothing found with this ID" });
          return;
        }
        res.json(dbpostData);
      })
      .catch((err) => res.status(400).json(err));
  },
  deletepost({ params }, res) {
    post
      .findOneAndDelete({ _id: params.id })
      .then((dbpostData) => {
        if (!dbpostData) {
          res.status(404).json({ message: "Nothing found with this ID" });
          return;
        }
        res.json(dbpostData);
      })
      .catch((err) => res.status(400).json(err));
  },
  addReaction({ params, body }, res) {
    post
      .findOneAndUpdate(
        { _id: params.postId },
        { $push: { reaction: body } },
        { new: true, runValidators: true }
      )
      .then((dbpostData) => {
        if (!dbpostData) {
          res.status(404).json({ message: "Nothing found with this ID" });
          return;
        }
        res.json(dbpostData);
      })
      .catch((err) => res.json(err));
  },
  deleteReaction({ params }, res) {
    post
      .findOneAndUpdate(
        { _id: params.postId },
        { $pull: { reaction: { reactionId: params.reactionId } } },
        { new: true }
      )
      .then((dbpostData) => res.json(dbpostData))
      .catch((err) => res.json(err));
  },
};

/* This is exporting the postController object so that it can be used in other files. */
module.exports = postController;
