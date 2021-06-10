const emailValidator = require('email-validator'); // Ajout d'un package EMAIL-VALIDATOR pour vérifier la saisie de l'email

app.get('/emailvalidate', (req, res) => {
    const email = req.query.email
    if (emailValidator.validate('email')) {
        console.log('Email valide')
      } else {
        console.log('Email invalid')
      }
});