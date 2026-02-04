const mongoose = require('mongoose');

const connectDb = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error('MONGO_URI no configurado');
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri);
};

module.exports = { connectDb };
