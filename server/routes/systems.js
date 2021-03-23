const sequenceGenerator = require("./sequenceGenerator");
const System = require("../models/system");

var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  System.find()
    .then((systems) => {
      res.status(200).json({
        message: "Systems received!",
        systems: systems,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "An error occurred", error: error });
    });
});

router.post("/", (req, res, next) => {
  const maxSystemId = sequenceGenerator.nextId("systems");

  const system = new System({
    id: maxSystemId,
    name: req.body.name,
    description: req.body.description,
    wanted: req.body.wanted,
    have: req.body.have,
    imageUrl: req.body.imageUrl,
    developer: req.body.developer,
  });

  system
    .save()
    .then((createdSystem) => {
      res.status(201).json({
        message: "System added successfully!",
        system: createdSystem,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  System.findOne({ id: req.params.id })
    .then((system) => {
      system.name = req.body.name;
      system.description = req.body.description;
      system.wanted = req.body.wanted;
      system.have = req.body.have;
      system.imageUrl = req.body.imageUrl;
      system.developer = req.body.developer;

      System.updateOne({ id: req.params.id }, system)
        .then((result) => {
          res.status(204).json({
            message: "System updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "System not found",
        error: { system: "System not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  System.findOne({ id: req.params.id })
    .then((system) => {
      System.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "System deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "System not found.",
        error: { system: "System not found" },
      });
    });
});

module.exports = router;
