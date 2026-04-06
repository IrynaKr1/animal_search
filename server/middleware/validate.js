const yup = require('yup');

const PET_VALIDATION_SCHEMA = yup.object({
  name: yup.string().trim().min(1).max(32).required(),
  owner: yup.string().trim().min(1).max(64).required(),
  ownerContacts: yup
    .string()
    .length(13)
    .matches(/^\+\d{12}$/, 'Phone number must contain 12 symbols, and + ')
    .required(),
  descritpion: yup.string().trim().min(15).max(255).required(),
  city: yup.string().oneOf(['Kyiv', 'Dnipro', 'New York']).required(),
  lostDate: yup.date().max(new Date()).required(),
  petTypeId: yup.number().min(1).required(),
});

module.exports.validatePetOnCreate = async (req, res, next) => {
  const { body } = req;

  try {
    const validatedPet = await PET_VALIDATION_SCHEMA.validate(body);
    req.body = validatedPet;
    next();
  } catch (error) {
    next(error);
  }
};
