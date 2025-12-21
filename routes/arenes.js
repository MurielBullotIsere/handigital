const express = require('express');
const router = express.Router();
const Arenes = require('../models/Arenes');

// Ajouter une nouvelle arène
router.post('/', async (req, res) => {
    try {
        const newArene = new Arenes(req.body);
        const areneRegistered = await newArene.save();

        await areneRegistered.populate([
            { path: 'type', select: 'nom' },
            { path: 'dresseurs_presents', select: 'nom' }
        ]);

        res.status(200).json(areneRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtenir toutes les arènes
router.get('/', async (req, res) => {
    try {
        const arenes = await Arenes.find().populate([
            { path: 'type', select: 'nom' },
            { path: 'dresseurs_presents', select: 'nom' }
        ]);

        res.status(200).json(arenes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtenir une arène par ID
router.get('/:id', async (req, res) => {
    try {
        const arene = await Arenes.findById(req.params.id).populate([
            { path: 'type', select: 'nom' },
            { path: 'dresseurs_presents', select: 'nom' }
        ]);

        if (!arene) {
            return res.status(404).json({ error: 'Arène non trouvée' });
        }

        res.status(200).json(arene);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Modifier une arène
router.put('/:id', async (req, res) => {
    try {
        const updatedArene = await Arenes.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate([
            { path: 'type', select: 'nom' },
            { path: 'dresseurs_presents', select: 'nom' }
        ]);

        if (!updatedArene) {
            return res.status(404).json({ error: 'Arène non trouvée' });
        }

        res.status(200).json(updatedArene);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Supprimer une arène
router.delete('/:id', async (req, res) => {
    try {
        const deletedArene = await Arenes.findByIdAndDelete(req.params.id);

        if (!deletedArene) {
            return res.status(404).json({ error: 'Arène non trouvée' });
        }

        res.status(200).json(deletedArene);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
