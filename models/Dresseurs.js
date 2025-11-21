const mongoose = require('mongoose');

const dresseursSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,     // le nom est obligatoire
            trim: true          // enlève les espaces avant et après la chaîne de caractères
        },
        // Un dresseur possède un tableau de ses pokemons capturés ayant un indicateur d'appartenance à l'équipe 
        pokemon_captures: [{
            pokemon : {
                type: mongoose.Schema.Types.ObjectId,   // le champ pokemon sera une clé étrangère (un ID)
                ref: 'Pokemons',                        // L'ID se trouve dans la table "Pokemons"
                required: true
            },
            team : {
                type: Boolean,
                default: false
            }
        }], 
        // Un dresseur possède un tableau d’objets, chaque objet étant une référence vers une table Objets.
        objets: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Objets',
            required: true
        }],
    },
    { 
        timestamps: true        // Mongoose ajoute automatiquement deux champs à chaque document : 
                                    // createdAt : date de création du document
                                    // updatedAt : date de la dernière modification
    }
);

module.exports = mongoose.model('Dresseurs', dresseursSchema);