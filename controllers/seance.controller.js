const Seance = require('../models/seance.model');

module.exports.getSeances = async (req, res) => {
  const seances = await Seance.find();
  res.status(200).json(seances);
};

exports.getSeanceById = async (req, res) => {
  const seances = await Seance.find({ idProgramme: req.params.idProgramme });
  console.log('Seances récupérés :', seances);
  if (!seances) {
    return res.status(404).json({ message: 'Aucune seance trouvé pour ce programme' });
  } else {
    res.status(200).json(seances);
  }
};

module.exports.createSeance = async (req, res) => {
    const seance = new Seance({
      idProgramme : req.body.idProgramme,
      nom : req.body.nom,
      muscle: req.body.muscle,
      affich: req.body.affich,
    });
    try {
      const newSeance = await seance.save();
      res.status(201).json({_id: newSeance._id});
    } catch (err) {
      res.status(400).json({ message: err.message });
    } 
};

module.exports.updateSeance = async (req, res) => {
  const newSeance = new Seance({
    idProgramme: req.body.idProgramme,
    nom: req.body.nom,
    muscle: req.body.muscle,
    affich: req.body.affich,
  })
  const seance = await Seance.findById(req.params.id);
  if (!seance) {
    res.status(404).json({ message: 'Seance non trouvée' });
  } else {
    seance.idProgramme = newSeance.idProgramme || seance.idProgramme;
    seance.nom = newSeance.nom || seance.nom;
    seance.muscle = newSeance.muscle || seance.muscle;
    seance.affich = newSeance.affich || seance.affich;
    await seance.save();
    res.status(200).json(seance);
  }
};

module.exports.deleteSeance = async (req, res) => {
  const seance = await Seance.findByIdAndDelete(req.params.id);
  if (!seance) {
    res.status(404).json({ message: 'Seance non trouvée' });
  } else {
    res.status(200).json({ message: 'Seance supprimée avec succès' });
  }
};
