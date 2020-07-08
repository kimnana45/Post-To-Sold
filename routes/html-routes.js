// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/postitem", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/postitem.html"));
  });

  app.get("/allitems", isAuthenticated, (req, res) => {
    db.Garage_sale.findAll({
      where: {sold: false}, include: db.User
    })
        .then(result => {
          console.log(result[0].dataValues.name)
          res.render("allitems", {items: result})
        })
        .catch(error => {
          res.status(500).json(error);
        });
    
    // res.sendFile(path.join(__dirname, "../public/allitems.html"));
  });
 
};
