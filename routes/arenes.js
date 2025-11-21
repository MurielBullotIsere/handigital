const express = require('express');
const router = express.Router();
const Arenes = require('../models/Arenes');

// Ajout d'un nouvelenregistrement dans la base de données.
router.post('/', async (req, res) => {
    try {
        const newArene = new Arenes(req.body);
        const areneRegistered = await newArene.save();
        res.status(200).json(areneRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtenir un tableau JSON contenant tous les enregistrements de la table.
router.get('/', async (req, res) => {
    try {
        const arene = await Arenes.find();
        res.status(200).json(arene);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Modifier un enregistrement
router.put('/:id', async (req, res) => {
    try {
        const updatedArene = await Arenes.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedArene);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Effacer un enregistrement
router.delete('/:id', async (req, res) => {
    try {
        const deletedArene = await Arenes.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedArene);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;