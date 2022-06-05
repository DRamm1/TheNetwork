/* Importing the router from the express package. */
const router = require("express").Router();

/* Importing the functions from the thoughtController.js file. */
const {
  getAllthought,
  getthoughtById,
  createthought,
  updatethought,
  deletethought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

/* This is a route that is being created for the `/` path.  The `.get` method is being used to call the
`getAllthought` function from the `thoughtController.js` file.  The `.thought` method is being used to
call the `createthought` function from the `thoughtController.js` file. */
router.route("/").get(getAllthought).post(createthought);

/* This is a route that is being created for the `/:id` path.  The `.get` method is being used to call
the
`getthoughtById` function from the `thoughtController.js` file.  The `.put` method is being used to
call the `updatethought` function from the `thoughtController.js` file.  The `.delete` method is
being used to
call the `deletethought` function from the `thoughtController.js` file. */
router.route("/:id").get(getthoughtById).put(updatethought).delete(deletethought);

/* This is a route that is being created for the `/:thoughtId/reaction/:reactionId` path.  The
`.thought` method is being used to call the `addReaction` function from the `thoughtController.js`
file.
The `.delete` method is being used to call the `deleteReaction` function from the
`thoughtController.js`
file. */
router
  .route("/:thoughtId/reaction/:reactionId")
  .thought(addReaction)
  .delete(deleteReaction);

module.exports = router;
