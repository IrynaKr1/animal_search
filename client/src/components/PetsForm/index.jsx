import React, { useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { createPetThunk, getTypesThunk } from '../../store/slices/petsSlice';
import { createPet } from '../../api';

const CITIES = ['Kyiv', 'Dnipro', 'New York'];

function PetsForm ({ petTypes, getTypes, createPet }) {
  const initialValues = {
    name: '',
    owner: '',
    ownerContacts: '',
    descritpion: '',
    city: CITIES[0],
    lostDate: '',
    petTypeId: petTypes[0],
  };

  const handleSubmit = (values, formikBag) => {
    createPet(values);
    formikBag.resetForm();
  };

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {formikProps => (
        <Form>
          <label>
            Pet's Name:
            <Field name='name' placeholder="Pet's name" autoFocus />
          </label>
          <br />
          <label>
            Your name:
            <Field name='owner' placeholder="Pet's owner" />
          </label>
          <br />
          <label>
            Your Contacts:
            <Field name='ownerContacts' placeholder='+XX XXX XX XX XXX' />
          </label>
          <br />
          <label>
            Descritpion:
            <Field name='descritpion' placeholder='Descritpion' />
          </label>
          <br />
          <label>
            Lost Date:
            <Field name='lostDate' type='date' />
          </label>
          <br />
          <label>City:</label>
          <select
            name='city'
            value={formikProps.values.city}
            onChange={formikProps.handleChange}
          >
            {CITIES.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
          <br />
          <label>Pet Type:</label>
          <select
            name='petTypeId'
            value={formikProps.values.petTypeId}
            onChange={formikProps.handleChange}
          >
            {petTypes.map(t => (
              <option key={t.id} value={t.id}>
                {t.type}
              </option>
            ))}
          </select>
          <button type='submit'>Add</button>
        </Form>
      )}
    </Formik>
  );
}
const mapDisatchToProps = dispatch => ({
  getTypes: () => dispatch(getTypesThunk()),
  createPet: values => dispatch(createPetThunk(values)),
});
const mapStateToProps = ({ petsData: { petTypes } }) => ({ petTypes });

export default connect(mapStateToProps, mapDisatchToProps)(PetsForm);
