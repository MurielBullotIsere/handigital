const mongoose = require('mongoose');

const typesSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true        // enlève les espaces avant et après la chaîne de caractères
    },
    affinites: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Affinites',
        required: true
    }]
});

module.exports = mongoose.model('Types', typesSchema);