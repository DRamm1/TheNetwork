/* This is importing the routes from the user and thought routes. */
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

/* This is importing the routes from the user and thought routes. */
router.use("/user", userRoutes);
router.use("/thought", thoughtRoutes);

/* This is exporting the router. */
module.exports = router;
