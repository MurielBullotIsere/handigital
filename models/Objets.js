const mongoose = require('mongoose');

const objetsSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true        // enlève les espaces avant et après la chaîne de caractères
    },
    categorie: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categories',
        required: true
    },
    description: {
        type: String,
        default: ""
    }   
});

module.exports = mongoose.model('Objets', objetsSchema);