const jwt = require('jsonwebtoken');

function requireAdmin(req, res, next) {
  // Récupérer le jeton JWT dans les cookies ou les en-têtes de requête
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

  // Si le jeton n'est pas trouvé, renvoyer une erreur 401
  if (!token) {
    return res.status(401).json({ message: 'Authentification requise.' });
  }

  try {
    // Vérifier et décoder le jeton JWT
    const decoded = jwt.verify(token, 'secret');
    const userRole = decoded.admin;

    // Si l'utilisateur n'a pas le rôle "admin", renvoyer une erreur 403
    if (!userRole) {
      return res.status(403).json({ message: 'Accès refusé.' });
    }

    // Si l'utilisateur a le rôle "admin", appeler le middleware suivant
    next();
  } catch (err) {
    // Si une erreur se produit lors de la vérification du jeton JWT, renvoyer une erreur 401
    res.status(401).json({ message: 'Authentification invalide.' });
  }
}
