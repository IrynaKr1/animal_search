const { Pet } = require('./../db/models');

module.exports.createPet = async (req, res, next) => {
  const { body } = req;

  try {
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
        exclude: ['createdAt', 'updatedAt'],
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
