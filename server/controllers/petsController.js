const createHttpError = require('http-errors');
const _ = require('lodash');
const { Pet } = require('./../db/models');

module.exports.createPet = async (req, res, next) => {
  const { body, file } = req;

  try {
    if (file) {
      body.petImage = file.filename;
    }
    const createdPet = await Pet.create(body);

    res.status(201).send({ data: createdPet });
  } catch (error) {
    next(error);
  }
};

module.exports.getPets = async (req, res, next) => {
  const { query } = req;

  const where = {};

  if (query.petType) {
    where.petTypeId = query.petType;
  }

  try {
    const findAllPets = await Pet.findAll({
      raw: true,
      attributes: {
        exclude: ['updatedAt'],
      },
      where,
    });

    res.status(200).send({ data: findAllPets });
  } catch (error) {
    next(error);
  }
};

module.exports.getPetById = async (req, res, next) => {};

module.exports.updatePetById = async (req, res, next) => {};

module.exports.deletePetById = async (req, res, next) => {};

module.exports.updatePetImage = async (req, res, next) => {
  const {
    file,
    params: { id },
  } = req;

  try {
    if (!file) {
      return next(createHttpError(422, 'Image is required'));
    }
    const [updatedPetCount, [updatedPet]] = await Pet.update(
      {
        petImage: file.filename,
      },
      { where: { id }, raw: true, returning: true }
    );

    if (!updatedPetCount) {
      return next(createHttpError(404, 'Pet Not Found'));
    }

    const preparedPet = _.omit(updatedPet, ['createdAt', 'updatedAt']);

    res.status(200).send(preparedPet);
  } catch (error) {
    next(error);
  }
};
