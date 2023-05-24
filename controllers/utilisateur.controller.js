const userModels = require("../models/utilisateur.model");
const bcrypt = require("bcrypt");

module.exports.getUsers = async (req,res) => {
    const users = await userModels.find();
    res.status(200).json(users);
};
module.exports.getUsersById = async (req,res) => {
    const users = await userModels.findById(req.params.id);
    res.status(200).json(users.Identifiant);
}

module.exports.getUsersByIdentifiant = async (req,res) => {
    const users = await userModels.find({Identifiant: req.params.Identifiant})
    if (users) {
        res.status(200).json(true);
    }
    else {
        res.status(200).json(false);
    }
}

module.exports.createUser = async (req, res) => {
    const { Identifiant, MotDePasse, admin } = req.body;
  
    // Vérifier si l'identifiant existe déjà
    const existingUser = await userModels.findOne({ Identifiant: Identifiant });
  
    if (existingUser) {
      return res.status(400).json({ message: "Identifiant déjà utilisé" });
    }
  
    // Crypter le mot de passe
    const hash = await bcrypt.hash(MotDePasse, 10);
  
    const newUser = await userModels.create({
      Identifiant: Identifiant,
      MotDePasse: hash,
      admin: admin,
    });
  
    res.status(201).json(newUser);
  };
  

module.exports.updateUser = async (req,res) => {
    const {Identifiant, MotDePasse, admin} = req.body;

    // Crypter le mot de passe si un nouveau mot de passe est fourni
    let hash;
    if (MotDePasse) {
        hash = await bcrypt.hash(MotDePasse, 10);
    }

    const user = await userModels.findByIdAndUpdate(req.params.id, {
        Identifiant,
        MotDePasse: hash,
        admin
    }, {new: true});

    if (!user) {
        return res.status(404).json({message: "Utilisateur introuvable"});
    }

    res.status(200).json(user);
};
  
module.exports.deleteUser = async (req,res) => {
    const user = await userModels.findById(req.params.id);

    if (!user) {
        return res.status(404).json({message: "Utilisateur introuvable"});
    }

    await userModels.deleteOne({_id: req.params.id});

    res.status(200).json({message: "Utilisateur supprimé avec succès"});
};
