var express = require("express");
var router = express.Router();
var Cart = require("../models/cart");

// Récupérer les voyages déjà payés et les afficher dans booking
router.get("/paid", (req, res) => {
  Cart.find({ paid: true })
    .populate("tripId")
    .then((cartItem) => {
      res.json(cartItem);
    })
    .catch((error) => {
      console.error("Les réservations n'ont pas pu être récupérées : ", error);
      res
        .status(500)
        .json({
          error: "Erreur serveur lors de la récupération des réservations",
        });
    });
});

// Récupérer les voyages mis dans le panier
router.get("/notpaid", (req, res) => {
  Cart.find({ paid: false })
    .populate("tripId")
    .then((cartItem) => {
      res.json(cartItem);
    })
    .catch((error) => {
      console.error(
        "Les voyages sélectionnés n'ont pas pu être récupérées : ",
        error
      );
      res
        .status(500)
        .json({
          error:
            "Erreur serveur lors de la récupération des voyages sélectionnés",
        });
    });
});

// Supprimer un voyage du panier
router.delete("/:tripId", (req, res) => {
  const tripId = req.params.tripId;
  Cart.deleteOne({ tripId: tripId })
    .then((newDoc) => {
      res.json({ newDoc });
    })
    .catch((error) => {
      console.error("Les voyages n'a pas pu être supprimé : ", error);
      res
        .status(500)
        .json({ error: "Erreur serveur lors de la suppression du voyage" });
    });
});

// Passer un voyage comme étant payé
router.put("/:tripId", (req, res) => {
  const tripId = req.params.tripId;
  Cart.updateOne({ tripId: tripId }, { paid: true })
    .then((newDoc) => {
      res.json({ newDoc });
    })
    .catch((error) => {
      console.error(
        "Les voyages sélectionnés n'ont pas pu être ajouté aux bookings",
        error
      );
      res
        .status(500)
        .json({
          error:
            "Erreur serveur lors de la récupération des voyages sélectionnés",
        });
    });
});

module.exports = router;
