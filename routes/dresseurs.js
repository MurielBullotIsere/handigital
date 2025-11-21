const express = require('express');
const router = express.Router();
const Dresseur = require('../models/Dresseurs');     // Importation du modèle Mongoose pour pouvoir créer et enregistrer des dresseurs.

// Ajout d'un nouveau dresseur dans la base de données.
router.post('/', async (req, res) => {
    try {
        const newDresseur = new Dresseurs(req.body);             // Création d'un nouvel enregistrement à partir de models/Dresseurs.js
        const dresseurRegistered = await newDresseur.save();    // save() enregistre dans la base de données, await attend que MongoDB réponde.
        res.status(200).json(dresseurRegistered);               // Envoi d'un objet JSON contenant le dresseur enregistré.
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtenir un tableau JSON contenant tous les enregistrements de la table Dresseur.
router.get('/', async (req, res) => {
    try {
        const dresseur = await Dresseurs.find();             // .find() est l'équivalent de SELECT * FROM dresseurs, sous forme d’un tableau JavaScript.
        res.status(200).json(dresseur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const dresseur = await Dresseurs.findById(req.params.id);
        res.status(200).json(dresseur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Trouver tous les dresseurs par condition.    :    const dresseur = await Dresseurs.find({ nom: "Sacha" });
// Trouver le premier dresseur trouvé par condition.   :    const dresseur = await Dresseurs.findOne({ nom: "Sacha" });

// Modifier un enregistrement
router.put('/:id', async (req, res) => {
    try {
        const updatedDresseur = await Dresseurs.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedDresseur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Effacer un enregistrement
router.delete('/:id', async (req, res) => {
    try {
        const deletedDresseur = await Dresseurs.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedDresseur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;