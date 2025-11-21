const express = require('express');
const router = express.Router();
const Categories = require('../models/Categories');

// Ajout d'un nouvelenregistrement dans la base de données.
router.post('/', async (req, res) => {
    try {
        const newCategorie = new Categories(req.body);
        const categorieRegistered = await newCategorie.save();
        res.status(200).json(categorieRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtenir un tableau JSON contenant tous les enregistrements de la table.
router.get('/', async (req, res) => {
    try {
        const categorie = await Categories.find();
        res.status(200).json(categorie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Trouver un enregistrement par ID.   
router.get('/:id', async (req, res) => {
    try {
        const categorie = await Categories.findById(req.params.id);
        res.status(200).json(categorie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Modifier un enregistrement
router.put('/:id', async (req, res) => {
    try {
        const updatedCategorie = await Categories.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCategorie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Effacer un enregistrement
router.delete('/:id', async (req, res) => {
    try {
        const deletedCategorie = await Categories.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedCategorie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;