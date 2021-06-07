const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userId = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


userId.plugin(uniqueValidator); //Utilisation de unique-validator pour s'assurer qu'une adresse mail est unique dans la bdd

module.exports = mongoose.model('User', userId);