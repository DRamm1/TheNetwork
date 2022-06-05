/* This is destructuring the thought and user models from the models folder. */
const { thought, User } = require("../models");

/* This is the controller for the thought model. It contains all the methods that will be used to
manipulate the thought model. */
const thoughtController = {
  getAllthought(req, res) {
    thought
      .find({})
      .select("-__v")
      .then((dbthoughtData) => res.json(dbthoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getthoughtById({ params }, res) {
    thought
      .findOne({ _id: params.id })
      .populate({
        path: "reaction",
        select: "-__v",
      })
      .select("-__v")
      .then((dbthoughtData) => {
        if (!dbthoughtData) {
          res.status(404).json({ message: "Nothing found with this ID" });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createthought({ params, body }, res) {
    thought
      .create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.id },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true }
        );
      })
      .then((dbthoughtData) => {
        if (!dbthoughtdata) {
          res.status(404).json({ message: "Nothing found with this ID" });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  updatethought({ params, body }, res) {
    thought
      .findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      })
      .then((dbthoughtData) => {
        if (!dbthoughtData) {
          res.status(404).json({ message: "Nothing found with this ID" });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  deletethought({ params }, res) {
    thought
      .findOneAndDelete({ _id: params.id })
      .then((dbthoughtData) => {
        if (!dbthoughtData) {
          res.status(404).json({ message: "Nothing found with this ID" });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  addReaction({ params, body }, res) {
    thought
      .findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reaction: body } },
        { new: true, runValidators: true }
      )
      .then((dbthoughtData) => {
        if (!dbthoughtData) {
          res.status(404).json({ message: "Nothing found with this ID" });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch((err) => res.json(err));
  },
  deleteReaction({ params }, res) {
    thought
      .findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reaction: { reactionId: params.reactionId } } },
        { new: true }
      )
      .then((dbthoughtData) => res.json(dbthoughtData))
      .catch((err) => res.json(err));
  },
};

/* This is exporting the thoughtController object so that it can be used in other files. */
module.exports = thoughtController;
