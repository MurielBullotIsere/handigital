const mongoose = require('mongoose');

const pokemonsSchema = new mongoose.Schema({
    nom: {
      type: String,
      required: true,
      trim: true        // enlève les espaces avant et après la chaîne de caractères
    },
    // uUn pokémon peut avoir plusieurs types
    types: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Types',
        required: true
    }],
    attaques: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Attaques',
        required: true
    }],
    taille: {
        type: Number,
        required: true
    },    
    poids: {
        type: Number,
        required: true
    },    
    sexe: {
        type: Boolean,
        default: false
    },    
    description: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('Pokemons', pokemonsSchema);