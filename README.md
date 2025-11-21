# Node.js
Node.js est un environnement d’exécution JavaScript qui permet de faire tourner du JavaScript côté serveur (en dehors du navigateur).  

- Permet de créer des serveurs web rapides sans configuration compliquée.  
- Unifie les langages : JavaScript côté client + JavaScript côté serveur.  
- Très utilisé dans les applications modernes (APIs, apps temps réel, microservices…).  

# MongoDB
MongoDB est une base de données NoSQL orientée documents.
Elle stocke les données sous forme de documents JSON (en réalité BSON), ce qui la rend très flexible.  

- Pas besoin de définir un schéma strict à l’avance.  
- Très pratique pour des données évolutives ou des structures non fixes.  
- Très utilisé dans les applications web modernes, notamment avec Node.js.

***
***
***
# Projet pokedex

**Projet en individuel : Création d'une base de données Pokemon avec Node.js et MongoDB :**  
Système simplifié sans les niveaux et avec des attaques simples identiques d'un pokémon à l'autre.
1. Pokemon : nom, types[], attaques[], taille, poids, description, sexe, evolutions[]  
2. Types : nom, faiblesses[], resistances[]  
3. Attaques : nom, type, puissance, precision, description  
4. Dresseur : nom, pokemons_actifs[], pokemons_captures[], objets[] -> Pokemons actifs = liste des ids des Pokemons déjà capturés  
5. Arenes : nom, type, dresseur[]  
6. Objets : nom, categories, description  

### /config/db.js  
Ecriture de "pokemon pokedex" dans les messages et "pokedex" dans l'URL.  
### /models  
Création de 6 fichiers correspondants aux 6 points du projets : Pokemon, Types, Attaques, Dresseur, Arenes, Objets.  Ajout de Categorie.  

Dans chaque fichier, création de la table avec ses champs.  

Clef primaire se fait automatiquement.  
Clef étrangère : type est la clef, Types est la table contenant la clef.
```python
type: {type: mongoose.Schema.Types.ObjectId, ref: 'Types', required: true},

```