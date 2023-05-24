const Exercice = require("../models/exercice.model");

exports.getExercices = async (req, res) => {
  const exercices = await Exercice.find();
  res.status(200).json(exercices);
};

exports.getExerciceById = async (req, res) => {
  const exercices = await Exercice.find({ idSeance: req.params.idSeance });
  console.log('Exercices récupérés :', exercices);
  if (!exercices) {
    return res.status(404).json({ message: 'Aucun exercice trouvé pour cette seance' });
  } else {
    res.status(200).json(exercices);
  }
};


  module.exports.createExercice = async (req, res) => {
    const exercice = new Exercice({
      idSeance : req.body.idSeance,
      nom : req.body.nom,
      series: req.body.series,
      performances: req.body.performances,
      affich: req.body.affich,
    });
    try {
      const newExercice = await exercice.save();
      res.status(201).json({_id: newExercice._id});
    } catch (err) {
      res.status(400).json({ message: err.message });
    } 
};
  

exports.updateExercice = async (req, res) => {
  try {
    const exercice = await Exercice.findById(req.params.id);
    if (!exercice) {
      res.status(404).json({ message: "Exercice non trouvé" });
    } else {
      const updatedExercice = await Exercice.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedExercice);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteExercice = async (req, res) => {
  try {
    const exercice = await Exercice.findById(req.params.id);
    if (!exercice) {
      res.status(404).json({ message: "Exercice non trouvé" });
    } else {
      await exercice.deleteOne({_id: req.params.id});
      res.status(200).json({ message: "Exercice supprimé" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
