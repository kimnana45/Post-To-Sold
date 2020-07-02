// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
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

  app.get("/items/user", isAuthenticated, (req, res) => {
    if (!req.user) {
      res.redirect("/");
    } else {
      const userId = req.user.id;
      db.garage_sale
        .findAll({
          where: { UserId: userId }
        })
        .then(result => {
          // eslint-disable-next-line camelcase
          res.render("garage_sale", { garage_sale: result });
        });
    }
    res.sendFile(path.join(__dirname, "../public/items.html"));
  });
};
