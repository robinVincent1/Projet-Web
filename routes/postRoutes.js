const express = require('express');
const router = express.Router();
const programmeController = require('../controllers/programme.controller');
const seanceController = require('../controllers/seance.controller');
const exerciceController = require('../controllers/exercice.controller');
const avisController = require('../controllers/avis.controller');
const utilisateurController = require('../controllers/utilisateur.controller');
const authenticateUser = require('../authentification/authentification');
const authenticateToken = require('../authentification/authenticateToken');
const deco = require('../authentification/deconnexion')

// Routes pour les programmes
router.get('/programmes/:createur', programmeController.getProgrammeById);
router.get('/programmes', programmeController.getProgrammeAdmin);
router.post('/programmes',  programmeController.createProgramme);
router.put('/programmes/:id', programmeController.updateProgramme);
router.delete('/programmes/:id',programmeController.deleteProgramme);

// Routes pour les séances
router.get('/seances/:idProgramme',  seanceController.getSeanceById);
router.post('/seances', seanceController.createSeance);
router.put('/seances/:id', seanceController.updateSeance);
router.delete('/seances/:id', seanceController.deleteSeance);

// Routes pour les exercices
router.get('/exercices/:idSeance', exerciceController.getExerciceById);
router.post('/exercices',  exerciceController.createExercice);
router.put('/exercices/:id', exerciceController.updateExercice);
router.delete('/exercices/:id',exerciceController.deleteExercice);

// Routes pour les avis
router.get('/avis', avisController.getAvis);
router.post('/avis', avisController.createAvis);
router.put('/avis/:id', authenticateToken, avisController.updateAvis);
router.delete('/avis/:id', authenticateToken, avisController.deleteAvis);

// Routes pour les utilisateurs
router.get('/utilisateurs/:Identifiant', utilisateurController.getUsersByIdentifiant)
router.get('/utilisateurs', authenticateToken, utilisateurController.getUsers);
router.get('/utilisateurs/:id', utilisateurController.getUsersById)
router.post('/utilisateurs', utilisateurController.createUser);
router.put('/utilisateurs/:id', authenticateToken, utilisateurController.updateUser);
router.delete('/utilisateurs/:id', authenticateToken, utilisateurController.deleteUser);

// Route authentification
router.post('/authentification', authenticateUser.authenticateUser);
router.get('/deconnexion', authenticateToken, deco.logout);

module.exports = router;
