/* This is importing the mongoose and express packages. */
const mongoose = require("mongoose");
const express = require("express");

/* This is setting up the express server. */
const app = express();
const PORT = process.env.PORT || 3001;

/* This is setting up the express server. */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* This is requiring the routes file. */
app.use(require("./routes"));

/* This is connecting to the database. */
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/TheNetwork",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

/* This is setting the debug mode to true. */
mongoose.set("debug", true);

/* This is setting up the server to listen on the port that is set up in the .env file. */
app.listen(PORT, () => console.log(`Connected to localhost:${PORT}`));
