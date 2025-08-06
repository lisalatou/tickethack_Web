const mongoose = require("mongoose");
const connectionString = process.env.CONNECTION_STRING;

const cartSchema = mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "trips" },
  paid: Boolean,
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
