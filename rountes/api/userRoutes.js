/* Destructuring the Router() method from the express module. */
const router = require("express").Router();

/* Destructuring the user-controller.js file. */
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

/* This is a method chaining. */
router.route("/").get(getAllUser).post(createUser);

/* This is a method chaining. */
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

/* This is a method chaining. */
router.route("/:userId/friend/:friendId").post(addFriend).delete(deleteFriend);

/* Exporting the router object. */
module.exports = router;
