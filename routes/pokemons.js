const express = require('express');
const router = express.Router();
const Pokemons = require('../models/Pokemons');

// Ajouter un nouveau Pokémon
router.post('/', async (req, res) => {
    try {
        const newPokemon = new Pokemons(req.body);
        const pokemonRegistered = await newPokemon.save();

        await pokemonRegistered.populate([
            { path: 'types', select: 'nom' },
            { path: 'attaques', select: 'nom puissance precision description' }
        ]);

        res.status(200).json(pokemonRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtenir tous les Pokémons
router.get('/', async (req, res) => {
    try {
        const pokemons = await Pokemons.find().populate([
            { path: 'types', select: 'nom' },
            { path: 'attaques', select: 'nom puissance precision description' }
        ]);

        res.status(200).json(pokemons);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtenir un Pokémon par ID
router.get('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemons.findById(req.params.id).populate([
            { path: 'types', select: 'nom' },
            { path: 'attaques', select: 'nom puissance precision description' }
        ]);

        if (!pokemon) {
            return res.status(404).json({ error: 'Pokémon non trouvé' });
        }

        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Modifier un Pokémon
router.put('/:id', async (req, res) => {
    try {
        const updatedPokemon = await Pokemons.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate([
            { path: 'types', select: 'nom' },
            { path: 'attaques', select: 'nom puissance precision description' }
        ]);

        if (!updatedPokemon) {
            return res.status(404).json({ error: 'Pokémon non trouvé' });
        }

        res.status(200).json(updatedPokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Supprimer un Pokémon
router.delete('/:id', async (req, res) => {
    try {
        const deletedPokemon = await Pokemons.findByIdAndDelete(req.params.id);

        if (!deletedPokemon) {
            return res.status(404).json({ error: 'Pokémon non trouvé' });
        }

        res.status(200).json(deletedPokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
