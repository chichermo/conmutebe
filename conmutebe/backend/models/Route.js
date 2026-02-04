const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema(
  {
    origin: { label: String, latitude: Number, longitude: Number },
    destination: { label: String, latitude: Number, longitude: Number },
    mode: { type: String, required: true },
    distanceKm: Number,
    durationMin: Number,
    costEur: Number,
    co2Kg: Number,
    steps: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Route', RouteSchema);
