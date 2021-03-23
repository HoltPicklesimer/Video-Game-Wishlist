const sequenceGenerator = require("./sequenceGenerator");
const Game = require("../models/game");

var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  Game.find()
    .populate("systems")
    .then((games) => {
      res.status(200).json({
        message: "Games received!",
        games: games,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "An error occurred", error: error });
    });
});

router.post("/", (req, res, next) => {
  const maxGameId = sequenceGenerator.nextId("games");

  const game = new Game({
    id: maxGameId,
    name: req.body.name,
    wanted: req.body.wanted,
    have: req.body.have,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    genre: req.body.genre,
    developer: req.body.developer,
    systems: req.body.systems,
  });

  game
    .save()
    .then((createdGame) => {
      res.status(201).json({
        message: "Game added successfully!",
        game: createdGame,
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
  Game.findOne({ id: req.params.id })
    .then((game) => {
      game.name = req.body.name;
      game.wanted = req.body.wanted;
      game.have = req.body.have;
      game.description = req.body.description;
      game.imageUrl = req.body.imageUrl;
      game.genre = req.body.genre;
      game.developer = req.body.developer;
      game.systems = req.body.systems;

      Game.updateOne({ id: req.params.id }, game)
        .then((result) => {
          res.status(204).json({
            message: "Game updated successfully",
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
        message: "Game not found",
        error: { game: "Game not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Game.findOne({ id: req.params.id })
    .then((game) => {
      Game.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Game deleted successfully",
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
        message: "Game not found.",
        error: { game: "Game not found" },
      });
    });
});

module.exports = router;
