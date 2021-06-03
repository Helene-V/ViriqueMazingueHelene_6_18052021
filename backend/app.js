const express = require('express');
const helmet = require("helmet");
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');
const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const mongooseUser = process.env.EXPRESS_APP_MONGOOSE_USER;
const mongoosePassword = process.env.EXPRESS_APP_MONGOOSE_PASSWORD;

mongoose.connect(`mongodb+srv://${mongooseUser}:${mongoosePassword}@cluster0.tohdk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


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