const Avis = require("../models/Avis.model");
const UtilisateurModel = require("../models/utilisateur.model");

module.exports.getAvis = async (req, res) => {
  try {
    const avis = await Avis.find();
    res.status(200).json(avis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.createAvis = async (req, res) => {
  try {
    const avis = new Avis({
      utilisateur: req.body.utilisateur,
      objet: req.body.objet,
      message: req.body.message,
    })
    await avis.save();
    res.status(201).json(avis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateAvis = async (req, res) => {
  try {
    const avis = await AvisModel.findById(req.params.id);
    if (!avis) return res.status(404).json({ message: "Avis non trouvé" });

    const updatedAvis = await AvisModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAvis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteAvis = async (req, res) => {
  try {
    const avis = await AvisModel.findById(req.params.id);
    if (!avis) return res.status(404).json({ message: "Avis non trouvé" });

    await AvisModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Avis supprimé" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
