const express = require('express');
const router = express.Router();
const Objets = require('../models/Objets');

// Ajout d'un nouvelenregistrement dans la base de données.
router.post('/', async (req, res) => {
    try {
        const newObjet = new Objets(req.body);
        const objetRegistered = await newObjet.save();
        await objetRegistered.populate('categorie');
        res.status(200).json(objetRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtenir un tableau JSON contenant tous les enregistrements de la table.
router.get('/', async (req, res) => {
    try {
        const objet = await Objets.find().populate('categorie');
        res.status(200).json(objet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Trouver un enregistrement par ID.   
router.get('/:id', async (req, res) => {
    try {
        const objet = await Objets.findById(req.params.id).populate('categorie');

          if (!objet) {
            return res.status(404).json({ error: 'Objet non trouvé' });
        }
        res.status(200).json(objet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Modifier un enregistrement
router.put('/:id', async (req, res) => {
    try {
        const updatedObjet = await Objets.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        ).populate('categorie');

        if (!updatedObjet) {
            return res.status(404).json({ error: 'Objet non trouvé' });
        }
    
        res.status(200).json(updatedObjet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Effacer un enregistrement
router.delete('/:id', async (req, res) => {
    try {
        const deletedObjet = await Objets.findByIdAndDelete(req.params.id);

        if (!deletedObjet) {
            return res.status(404).json({ error: 'Objet non trouvé' });
        }
        res.status(200).json(deletedObjet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;