const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    nom: {
      type: String,
      required: true,
      trim: true        // enlève les espaces avant et après la chaîne de caractères
    }
});

module.exports = mongoose.model('Categories', categoriesSchema);