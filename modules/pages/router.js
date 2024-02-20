const express = require("express");
const pageRouter = express.Router();
const Whiskeys = require("../whiskeys/func");

pageRouter.get("/", async (request, response) => {
  whiskeys = await Whiskeys.getWhiskeys();
  response.render("index", { pageTitle: "Home", whiskeys: whiskeys });
});
pageRouter.get("/about", async (request, response) => {
  whiskeys = await Whiskeys.getWhiskeys();
  response.render("about", { pageTitle: "About", whiskeys: whiskeys });
});

module.exports = pageRouter;