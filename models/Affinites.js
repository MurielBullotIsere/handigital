// liste des faiblesse et des résistances
const mongoose = require('mongoose');

const affinitesSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true        // enlève les espaces avant et après la chaîne de caractères
    },
    description: {
        type: String,
        default: ""
    }   
});

module.exports = mongoose.model('Affinites', affinitesSchema);