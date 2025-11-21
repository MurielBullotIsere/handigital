const express = require('express');
const router = express.Router();
const Attaques = require('../models/Attaques');

// Ajout d'un nouvelenregistrement dans la base de données.
router.post('/', async (req, res) => {
    try {
        const newAttaque = new Attaques(req.body);
        const attaqueRegistered = await newAttaque.save();
        res.status(200).json(attaqueRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtenir un tableau JSON contenant tous les enregistrements de la table.
router.get('/', async (req, res) => {
    try {
        const attaque = await Attaques.find();
        res.status(200).json(attaque);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Modifier un enregistrement
router.put('/:id', async (req, res) => {
    try {
        const updatedAttaque = await Attaques.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedAttaque);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Effacer un enregistrement
router.delete('/:id', async (req, res) => {
    try {
        const deletedAttaque = await Attaques.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedAttaque);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;