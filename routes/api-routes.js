const db = require("../models");
const passport = require("../config/passport");
// const isAuthenticated = require("../config/middleware/isAuthenticated");//Why is this here?

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });


  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  //GET route for getting all posts/ view all items
  app.get("/api/items/:id?", (req, res) => {
    if (!req.user) {
      res.status(500).send("unauthorized");
    } else {
      const options = {};
      if (req.params.id) {
        options.where = { id: req.params.id };
      }
      db.Garage_sale.findAll(options)
        .then(result => {
          res.json(result);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    }
  });

  //POST route for creating a new postItem
  app.post("/api/posts", function (req, res) {
    db.Garage_sale.create(req.body).then(function (dbGarage_sale) {
      console.log(dbGarage_sale);
      res.json(dbGarage_sale);
    });
  });

  //DELETE route for when an item is sold/deleted
  app.delete("/api/items/:id", (req, res) => {
    const userId = req.user.id;

    db.garage_sale
      .destroy({
        where: { UserId: userId, id: req.params.id }
      })
      .then(result => {
        res.json(result);
      });
  });
}
