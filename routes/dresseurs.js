const express = require('express');
const router = express.Router();
const Dresseurs = require('../models/Dresseurs');

// Ajouter un nouveau dresseur
router.post('/', async (req, res) => {
    try {
        const newDresseur = new Dresseurs(req.body);
        const dresseurRegistered = await newDresseur.save();

        await dresseurRegistered.populate([
            {path: 'pokemons',  select: 'nom taille poids sexe'},
            {path: 'objets', select: 'nom'}
        ]);

        res.status(200).json(dresseurRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtenir tous les dresseurs
router.get('/', async (req, res) => {
    try {
        const dresseurs = await Dresseurs.find().populate([
            {path: 'pokemons',  select: 'nom taille poids sexe'},
            {path: 'objets', select: 'nom'}
        ]);

        res.status(200).json(dresseurs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtenir un dresseur par ID
router.get('/:id', async (req, res) => {
    try {
        const dresseur = await Dresseurs.findById(req.params.id).populate([
            {path: 'pokemons',  select: 'nom taille poids sexe'},
            {path: 'objets', select: 'nom'}
        ]);

        if (!dresseur) {
            return res.status(404).json({ error: 'Dresseur non trouvé' });
        }

        res.status(200).json(dresseur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Modifier un dresseur
router.put('/:id', async (req, res) => {
    try {
        const updatedDresseur = await Dresseurs.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate([
            {path: 'pokemons',  select: 'nom taille poids sexe'},
            {path: 'objets', select: 'nom'}
        ]);

        if (!updatedDresseur) {
            return res.status(404).json({ error: 'Dresseur non trouvé' });
        }

        res.status(200).json(updatedDresseur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Supprimer un dresseur
router.delete('/:id', async (req, res) => {
    try {
        const deletedDresseur = await Dresseurs.findByIdAndDelete(req.params.id);

        if (!deletedDresseur) {
            return res.status(404).json({ error: 'Dresseur non trouvé' });
        }

        res.status(200).json(deletedDresseur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
