const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Non autorisé.' });
  }
};

module.exports = authenticateToken;
