/* This is importing the api routes from the api folder. */
const router = require("express").Router();
const apiRoutes = require("./api");

/* This is telling the router to use the api routes. */
router.use("/api", apiRoutes);

/* This is a catch all for any routes that are not defined. */
router.use((req, res) => {
  res.status(404).send("<h1>Error 404</h1>");
});

/* This is exporting the router to be used in the server.js file. */
module.exports = router;
