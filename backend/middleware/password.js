const passwordValidator = require('password-validator'); // Mise en place du package pour que l'utilisateur reforce son password à la création de son compte

module.exports = (req, res, next) => {
    const schema = new passwordValidator()
    try {
      if (!schema.validate (req.body.schema)) {
        throw 'Invalid password';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };