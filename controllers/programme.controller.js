const Programme = require('../models/programme.model');


exports.getProgrammeAdmin = async (req, res) => {
  const programmes = await Programme.find({ admin: true });
  console.log('Programmes récupérés :', programmes);
  if (!programmes) {
    return res.status(404).json({ message: 'Aucun programme trouvé pour cet utilisateur' });
  } else {
    res.status(200).json(programmes);
  }
};



exports.getProgrammeById = async (req, res) => {
  const programmes = await Programme.find({ createur: req.params.createur });
  console.log('Programmes récupérés :', programmes);
  if (!programmes) {
    return res.status(404).json({ message: 'Aucun programme trouvé pour cet utilisateur' });
  } else {
    res.status(200).json(programmes);
  }
};


exports.createProgramme = async (req, res) => {
  const programme = new Programme({
    createur: req.body.createur,
    admin: req.body.admin,
    nom: req.body.nom,
    affich: req.body.affich,
  });

  try {
    const newProgramme = await programme.save();
    res.status(201).json({_id : newProgramme._id});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProgramme = async (req, res) => {
  try {
    const programme = await Programme.findById(req.params.id);
    if (!programme) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }
    programme.createur = req.body.createur;
    programme.nom = req.body.nom;
    programme.affich = req.body.affich;
    programme.admin = req.body.admin;

    const updatedProgramme = await programme.save();
    res.status(200).json(updatedProgramme);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProgramme = async (req, res) => {
  try {
    const programme = await Programme.findByIdAndDelete(req.params.id);
    if (!programme) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }
    res.status(200).json({ message: 'Programme supprimé' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
