const schemaPassword = require('../models/Password');

module.exports = (req, res, next) => {
      if (!schemaPassword.validate (req.body.password)) {
        return res.status(400).json({ message: 'Veuillez vérifier votre mot de passe s\'il vous plaît' })
      } else {
        next();
      }
  };