const { Router } = require('express');
const { petsController } = require('../controllers');
const { validation } = require('./../middleware');

const petsRouter = Router();

petsRouter
  .route('/')
  .post(validation.validatePetOnCreate, petsController.createPet)
  .get(petsController.getPets);

petsRouter
  .route('/:id')
  .get(petsController.getPetById)
  .patch(petsController.updatePetById)
  .delete(petsController.deletePetById);

module.exports = petsRouter;
