import * as Yup from 'yup';
import CONSTANTS from './../constants';

const validationSchema = Yup.object({
  name: Yup.string().max(32, 'Max 32 characters').required('Required'),

  owner: Yup.string()
    .max(64, 'Max 64 characters')
    .matches(
      /^[A-ZÀ-Ž][a-zA-Zà-ž]+ [A-ZÀ-Ž][a-zA-Zà-ž]+$/,
      'Enter first and last name, each starting with a capital letter'
    )
    .required('Required'),

  ownerContacts: Yup.string()
    .matches(/^\+\d{12}$/, 'Format: +123456789012')
    .required('Required'),

  petTypeId: Yup.string().required('Required'),

  city: Yup.string().oneOf(CONSTANTS.CITIES).required('Required'),

  lostDate: Yup.date()
    .max(new Date(), 'Date cannot be in the future')
    .required('Required'),

  description: Yup.string(),

  photo: Yup.mixed(),
});

export default validationSchema;
