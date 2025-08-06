var express = require("express");
var router = express.Router();
var moment = require("moment");
var Trip = require("../models/trips");

//Recherche de voyage
router.post("/", (req, res) => {
  const { departure, arrival, date } = req.body;

  if (!departure || !arrival || !date) {
    return res.status(400).json({ result: false, message: "No trip found" });
  } else {
    // Conversion de la date et on prend le début de cette journée
    const startDay = moment(date).startOf("day");
    const endDay = moment(date).endOf("day");

    // Recherche dans la BDD
    Trip.find({
      departure: { $regex: new RegExp(`^${departure}`, "i") },
      arrival: { $regex: new RegExp(`^${arrival}`, "i") },
      date: { $gte: startDay.toDate(), $lt: endDay.toDate() },
    })
      .then((data) => {
        if (data.length === 0) {
          return res.json({
            result: false,
            message: "Pas de voyage pour ces critères",
          });
        } else {
          const dates = data.map((trip) => moment(trip.date).format("LT"));
          const timeFromNow = data.map((trip) => moment(trip.date).fromNow());
          res.json({
            result: true,
            trips: data,
            dates: dates,
            timeFromNow: timeFromNow,
          });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche de voyages:", error);
        res.status(500).json({
          result: false,
          message: "Erreur serveur lors de la recherche",
        });
      });
  }
});

router.get("/:tripId", (req, res) => {
  const tripId = req.params.tripId;
  Trip.findOne({ _id: tripId }).then((data) => {
    res.json({ trip: data });
  });
});

module.exports = router;
