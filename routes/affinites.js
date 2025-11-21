const express = require('express');
const router = express.Router();
const Affinites = require('../models/Affinites');     // Importation du modèle Mongoose pour pouvoir créer et enregistrer des affinités.

// Ajout d'une nouvelle affinité dans la base de données.
router.post('/', async (req, res) => {
    try {
        const newAffinite = new Affinites(req.body);            // newAffinite = un nouvel objet Affinite avec les champs envoyés par le formulaire
        const affiniteRegistered = await newAffinite.save();    // save() enregistre dans la base de données, await attend que MongoDB réponde, renvoie le document sauvegardé (avec son _id) pour le stocker dans affiniteRegistered
        res.status(200).json(affiniteRegistered);               // crée une réponse HTTP avec le statut 200 OK, envoie l’objet affiniteRegistered au client, au format JSON
        // res est l’objet response d’Express, qui permet d’envoyer quelque chose au client.
        // .status(200) : On choisit le code HTTP de la réponse.
            // 200 = OK
            // 201 = Created (souvent utilisé pour un POST)
            // 400 = Bad Request
            // 404 = Not Found
            // 500 = Internal Server Error
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtenir un tableau JSON contenant tous les enregistrements de la table Affinites.
router.get('/', async (req, res) => {
    try {
        const affinite = await Affinites.find();             // .find() est l'équivalent de SELECT * FROM Affinites, sous forme d’un tableau JavaScript.
        res.status(200).json(affinite);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Trouver un enregistrement par ID.
router.get('/:id', async (req, res) => {
    try {
        const affinite = await Affinites.findById(req.params.id);
        res.status(200).json(affinite);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Modifier un enregistrement.
router.put('/:id', async (req, res) => {
    try {
        const updatedAffinite = await Affinites.findByIdAndUpdate(
            req.params.id,      // req.params contient les paramètres d’URL, l'id
            req.body,           // contient les nouveaux champs envoyé par le formulaire
            { new: true }       // true renvoie l’objet mis à jour, false renvoie l’ancienne version du document
        );
        res.status(200).json(updatedAffinite);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Effacer un enregistrement
router.delete('/:id', async (req, res) => {
    try {
        const deletedAffinite = await Affinites.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedAffinite);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;    // on exporte le router pour pouvoir l'utiliser dans app.js ou server.js 