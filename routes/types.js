const express = require('express');
const router = express.Router();
const Types = require('../models/Types');

// Ajout d'un nouvel enregistrement dans la base de données.
router.post('/', async (req, res) => {
    try {
        const newType = new Types(req.body);
        const typeRegistered = await newType.save();
        await typeRegistered.populate('affinites', 'nom description');
        res.status(200).json(typeRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtenir un tableau JSON contenant tous les enregistrements de la table.
router.get('/', async (req, res) => {
    try {
        const type = await Types.find().populate('affinites', 'nom description');
        res.status(200).json(type);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Trouver un enregistrement par ID.   
router.get('/:id', async (req, res) => {
    try {
        const type = await Types.findById(req.params.id).populate('affinites', 'nom description');

          if (!type) {
            return res.status(404).json({ error: 'Objet non trouvé' });
        }
        res.status(200).json(type);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Modifier un enregistrement
router.put('/:id', async (req, res) => {
    try {
        const updatedType = await Types.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        ).populate('affinites', 'nom description');

        if (!updatedType) {
            return res.status(404).json({ error: 'Type non trouvé' });
        }
        res.status(200).json(updatedType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Effacer un enregistrement
router.delete('/:id', async (req, res) => {
    try {
        const deletedType = await Types.findByIdAndDelete(req.params.id);
        if (!deletedType) {
            return res.status(404).json({ error: 'Type non trouvé' });
        }
        res.status(200).json(deletedType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;