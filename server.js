const express = require('express');             // express : framework pour construire l'API.
const cors = require('cors');                   // CORS permet au front (React, Vue, Angular...) d'appeler l'API sans erreur.
const connectDB = require('./config/db');       // Recherche de la fonction qui connecte MongoDB.

connectDB();                                    // Execution de la fonction : connection au démarrage du serveur à la base Mongo

const app = express();
app.use(cors());                                // Activation de CORS.
app.use(express.json());                        // Retranscription en langage json.

// Si on a router.get('/') dans le fichier route, l'URL finale est GET http://localhost:3000/api/dresseurs
app.use('/api/affinites', require('./routes/affinites'));
app.use('/api/arenes', require('./routes/arenes'));
app.use('/api/attaques', require('./routes/attaques'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/dresseurs', require('./routes/dresseurs'));       // toutes les routes déclarées dans routes/dresseur.js commencent par /api/dresseurs.
app.use('/api/objets', require('./routes/objets'));
app.use('/api/pokemons', require('./routes/pokemons'));
app.use('/api/types', require('./routes/types'));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});