var express = require("express");
var router = express.Router();

const model = require("./func");

//In order to parse POST body data as JSON, do the following.
//The following lines will convert the form data from query
//string format to JSON format.
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//PAGE ROUTES FOR ADMIN PAGES

router.get("/", async (request, response) => {
  let whiskeys = await model.getWhiskeys();

  response.render("admin/menu-admin", { pageTitle: "Administer menu whiskeys", menu: whiskeys });
})
router.get("/add", async (request, response) => {
  let whiskeys = await model.getWhiskeys(); //we just need this because the menu-add template is using the common layout, which needs the whiskeys for displaying the main menu in the header

  response.render("admin/menu-add", { pageTitle: "Add menu link", whiskeys: whiskeys });
});
/* router.get("/edit", async (request, response) => {
  if (request.query.linkId) {
    let id = request.query.linkId;
    let linkToEdit = await model.getSingleWhiskey(id);
    whiskeys = await model.getWhiskeys();

    response.render("admin/menu-edit", { pageTitle: "Edit link", editWhiskey: linkToEdit, menu: whiskeys });
  }
});
 */

//FORM PROCESSING PATHS
router.post("/add/submit", async (request, response) => {
  //POST forms send the form field data via request.body.<field-name> because POST requests send data in the body
  //GET forms send the form field data via request.query.<field-name>
  //console.log(request.body.weight);
  let name = request.body.name;
  let brand = request.body.brand;
  let origin = request.body.origin;
  let price = request.body.price;
  let image_url = request.body.image_url;
  let newWhiskey = { "name": name, "brand": brand, "origin": origin, "price": price, "image_url": image_url}
  model.addWhiskey(newWhiskey); //insert new link to menuWhiskeys

  response.redirect("/admin/menu");
})

router.get("/delete", async (request, response) => {
  //for a GET form, field values are passed in request.query.<field_name> because we're retrieving from a query string
  let id = request.query.whiskeyId;
  await model.deleteWhiskey(id);
  response.redirect("/admin/menu");
});
/* router.post("/edit/submit", async (request, response) => {
  //fill out this code
  //get the _id to use this as a filter
  let id = "<fill_out>";
  //get weight/path/name values and build this is your updated document
  let link = {
    weight: "<replace>",
    path: "<replace>",
    name: "<replace>"
  };
  //run editWhiskey()
}); */

module.exports = router;
