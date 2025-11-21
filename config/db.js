const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/pokedex');
    console.log('Connected to MongoDB pokemon pokedex database');
    } catch (err) {
    console.error('Error connecting to MongoDB pokemon pokedex database:', err);
    }
};

module.exports = connectDB;