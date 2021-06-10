const express = require('express'); // Ajout de l'application Express
const helmet = require('helmet'); // Package Helmet pour la sécurité des en-têtes
require('dotenv').config(); // Mise en place de dotenv pour cacher l'id et le password permettant l'accès aux données sur mongoDb

const app = express();
const mongoose = require('mongoose'); // Importation de mongoose dans l'application
const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Sécurisation de l'id et password via dotenv
const mongooseUser = process.env.EXPRESS_APP_MONGOOSE_USER;
const mongoosePassword = process.env.EXPRESS_APP_MONGOOSE_PASSWORD;

// Connexion à MongoDb
mongoose.connect(`mongodb+srv://${mongooseUser}:${mongoosePassword}@cluster0.tohdk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use(helmet()); // Sécurisation des en-têtes HTTP

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes)

module.exports = app;