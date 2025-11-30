const mongoose = require('mongoose');

const arenesSchema = new mongoose.Schema({
    nom: {
      type: String,
      required: true,
      trim: true        // enlève les espaces avant et après la chaîne de caractères
    },    
    type: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Types',
        required: true
    }],
    dresseurs_presents: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Dresseurs'
    }]
});

module.exports = mongoose.model('Arenes', arenesSchema);