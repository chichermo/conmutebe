const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    language: { type: String, default: 'nl' },
    region: { type: String, default: 'flanders' },
    points: { type: Number, default: 0 },
    isPremium: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
