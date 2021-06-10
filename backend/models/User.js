const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // Package permettant de contrôler que deux utilisateurs n'utilisent pas la même adresse mail


const userId = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


userId.plugin(uniqueValidator);

module.exports = mongoose.model('User', userId);