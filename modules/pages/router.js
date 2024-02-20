const express = require("express");
const pageRouter = express.Router();
const menuWhiskeys = require("../menuWhiskeys/func");

pageRouter.get("/", async (request, response) => {
  whiskeys = await menuWhiskeys.getWhiskeys();
  response.render("index", { pageTitle: "Home", whiskeys: whiskeys });
});
pageRouter.get("/about", async (request, response) => {
  whiskeys = await menuWhiskeys.getWhiskeys();
  response.render("about", { pageTitle: "About", whiskeys: whiskeys });
});

module.exports = pageRouter;