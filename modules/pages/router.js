const express = require("express");
const pageRouter = express.Router();
const Whiskeys = require("../whiskeys/func");

pageRouter.get("/", async (request, response) => {
  whiskeys = await Whiskeys.getWhiskeys();
  response.render("index", { pageTitle: "Home", whiskeys: whiskeys });
});
pageRouter.get("/products", async (request, response) => {
  whiskeys = await Whiskeys.getWhiskeys();
  response.render("products", { pageTitle: "products", whiskeys: whiskeys });
});

module.exports = pageRouter;