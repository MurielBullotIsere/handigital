const express = require('express');
const router = express.Router();
const Attaques = require('../models/Attaques');

// Ajouter une nouvelle attaque
router.post('/', async (req, res) => {
    try {
        const newAttaque = new Attaques(req.body);
        const attaqueRegistered = await newAttaque.save();

        await attaqueRegistered.populate('type', 'nom puissance precision');

        res.status(200).json(attaqueRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtenir toutes les attaques
router.get('/', async (req, res) => {
    try {
        const attaques = await Attaques.find().populate('type', 'nom puissance precision');
        res.status(200).json(attaques);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtenir une attaque par ID
router.get('/:id', async (req, res) => {
    try {
        const attaque = await Attaques.findById(
            req.params.id
        ).populate('type', 'nom puissance precision');

        if (!attaque) {
            return res.status(404).json({ error: 'Attaque non trouvée' });
        }

        res.status(200).json(attaque);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Modifier une attaque
router.put('/:id', async (req, res) => {
    try {
        const updatedAttaque = await Attaques.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('type', 'nom puissance precision');

        if (!updatedAttaque) {
            return res.status(404).json({ error: 'Attaque non trouvée' });
        }

        res.status(200).json(updatedAttaque);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Supprimer une attaque
router.delete('/:id', async (req, res) => {
    try {
        const deletedAttaque = await Attaques.findByIdAndDelete(
            req.params.id
        );

        if (!deletedAttaque) {
            return res.status(404).json({ error: 'Attaque non trouvée' });
        }

        res.status(200).json(deletedAttaque);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;