var db = require("../models");

module.exports = function(app) {
  app.get("/api/items", function(req, res) {
    
    db.Item.findAll({}).then(function(dbPosteditem) {
      res.json(dbPosteditem);
    });
  });

  app.get("/api/items/:id", function(req, res) {
    db.Posteditem.findOne({
      where: {
        id: req.params.id
      },
    }).then(function(dbPosteditem) {
      res.json(dbPosteditem);
    });
  });

  app.post("/api/items", function(req, res) {
    db.Posteditem.create(req.body).then(function(dbPosteditem) {
      res.json(dbPosteditem);
    });
  });

  app.delete("/api/items/:id", function(req, res) {
    db.Posteditem.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPosteditem) {
      res.json(dbPosteditem);
    });
  });

  app.put('/api/items/:id', (req, res) => {
    db.Posteditem.update({
      name: req.body.name,
      description: req.body.last_name,
      price: req.body.price,
      picture: req.body.picture,
    }, {
      where: { id: req.params.id },
    }).then((dbPosteditem) => {
      res.json(dbPosteditem);
    });
  });

};
