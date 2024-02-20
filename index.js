//include required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

//load my custom environment variables
dotenv.config();

//import page routes
const pageRouter = require("./modules/pages/router");
const adminMenuRouter = require("./modules/whiskeys/router");

//set up Express app and port number
const app = express();
const port = process.env.PORT || "8888";

//SET UP APP TO USE PUG AS TEMPLATE ENGINE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//SET UP STATIC FILE PATHS
app.use(express.static(path.join(__dirname, "public")));

//USE PAGE ROUTES FROM MODULE
app.use("/", pageRouter);
app.use("/admin/whiskey", adminMenuRouter);

//start server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})

