/* This is importing the routes from the user and post routes. */
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

/* This is importing the routes from the user and post routes. */
router.use("/user", userRoutes);
router.use("/post", postRoutes);

/* This is exporting the router. */
module.exports = router;
