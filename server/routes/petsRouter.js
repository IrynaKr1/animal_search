const { Router } = require('express');
const { petsController } = require('../controllers');
const { validation, upload } = require('./../middleware');

const petsRouter = Router();

petsRouter
  .route('/')
  .post(
    upload.uploadPetImage,
    validation.validatePetOnCreate,
    petsController.createPet
  )
  .get(petsController.getPets);

petsRouter
  .route('/:id')
  .get(petsController.getPetById)
  .patch(petsController.updatePetById)
  .delete(petsController.deletePetById);

petsRouter.patch(
  '/:id/images',
  upload.uploadPetImage,
  petsController.updatePetImage
);

module.exports = petsRouter;
