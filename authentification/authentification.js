
const jwt =  require('jsonwebtoken');
const User = require('../models/utilisateur.model');
const bcrypt = require('bcrypt');

exports.authenticateUser = async (req, res, next) => {
  const { Identifiant, MotDePasse } = req.body;

  try {
    const user = await User.findOne({ Identifiant });

    if (!user) {
      return res.status(401).json({ message: 'Identifiant ou mot de passe incorrect. 1' });
    }

    const isMatch = await bcrypt.compare(MotDePasse , user.MotDePasse);

    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiant ou mot de passe incorrect. 2' });
    }
    const idUser = user._id
    // Générer le jeton d'authentification
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Stocker le jeton dans un cookie sécurisé
    res.cookie('jwt', token, { httpOnly: true, secure: true });

    // Renvoyer la réponse au client
    res.status(200).json({ 
      message: 'Authentification réussie.',
      Token : token, 
      id : idUser,
      admin: user.admin,
  });
  } catch (error) {
    next(error);
  }
};

