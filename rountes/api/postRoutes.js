/* Importing the router from the express package. */
const router = require("express").Router();

/* Importing the functions from the postController.js file. */
const {
  getAllpost,
  getpostById,
  createpost,
  updatepost,
  deletepost,
  addReaction,
  deleteReaction,
} = require("../../controllers/postController");

/* This is a route that is being created for the `/` path.  The `.get` method is being used to call the
`getAllpost` function from the `postController.js` file.  The `.post` method is being used to
call the `createpost` function from the `postController.js` file. */
router.route("/").get(getAllpost).post(createpost);

/* This is a route that is being created for the `/:id` path.  The `.get` method is being used to call
the
`getpostById` function from the `postController.js` file.  The `.put` method is being used to
call the `updatepost` function from the `postController.js` file.  The `.delete` method is
being used to
call the `deletepost` function from the `postController.js` file. */
router.route("/:id").get(getpostById).put(updatepost).delete(deletepost);

/* This is a route that is being created for the `/:postId/reaction/:reactionId` path.  The
`.post` method is being used to call the `addReaction` function from the `postController.js`
file.
The `.delete` method is being used to call the `deleteReaction` function from the
`postController.js`
file. */
router
  .route("/:postId/reaction/:reactionId")
  .post(addReaction)
  .delete(deleteReaction);

module.exports = router;
