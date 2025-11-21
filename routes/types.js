const express = require('express');
const router = express.Router();
const Types = require('../models/Types');

// Ajout d'un nouvelenregistrement dans la base de données.
router.post('/', async (req, res) => {
    try {
        const newType = new Types(req.body);
        const typeRegistered = await newType.save();
        res.status(200).json(typeRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtenir un tableau JSON contenant tous les enregistrements de la table.
router.get('/', async (req, res) => {
    try {
        const type = await Types.find();
        res.status(200).json(type);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Modifier un enregistrement
router.put('/:id', async (req, res) => {
    try {
        const updatedType = await Types.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Effacer un enregistrement
router.delete('/:id', async (req, res) => {
    try {
        const deletedType = await Types.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;