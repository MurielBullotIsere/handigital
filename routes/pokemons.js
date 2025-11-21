const express = require('express');
const router = express.Router();
const Pokemons = require('../models/Pokemons');

// Ajout d'un nouvelenregistrement dans la base de données.
router.post('/', async (req, res) => {
    try {
        const newPokemon = new Pokemons(req.body);
        const pokemonRegistered = await newPokemon.save();
        res.status(200).json(pokemonRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtenir un tableau JSON contenant tous les enregistrements de la table.
router.get('/', async (req, res) => {
    try {
        const pokemon = await Pokemons.find();
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Modifier un enregistrement
router.put('/:id', async (req, res) => {
    try {
        const updatedPokemon = await Pokemons.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Effacer un enregistrement
router.delete('/:id', async (req, res) => {
    try {
        const deletedPokemon = await Pokemons.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedPokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;