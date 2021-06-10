const jwt = require('jsonwebtoken'); // Implémentation de l'authentification par token pour protéger les routes

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Récupération du token dans le header
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Décoder le token grâce à la clef secrète
    const userId = decodedToken.userId; // Récupération de l'userId dans le tocken
    if (req.body.userId && req.body.userId !== userId) { // Si le token est différent de l'userId la requête sera bloquée pour sécuriser les routes de l'API
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};