const mongoose = require('mongoose');

const attaquesSchema = new mongoose.Schema({
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
    puissance: {
        type: Number,
        required: true
    },    
    precision: {
        type: Number,
        required: true
    },    
    description: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('Attaques', attaquesSchema);