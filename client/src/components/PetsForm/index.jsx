import React, { useEffect } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createPetThunk, getTypesThunk } from '../../store/slices/petsSlice';
import CONSTANTS from '../../constants';
import validationSchema from '../../utils/validationSchema.js';
import styles from './PetsForm.module.scss';

function PetsForm ({ petTypes, getTypes, createPet }) {
  const initialValues = {
    name: '',
    owner: '',
    ownerContacts: '',
    descritpion: '',
    city: CONSTANTS.CITIES[0],
    lostDate: '',
    petTypeId: petTypes[0]?.id ?? '',
    petImage: null,
  };

  const handleSubmit = (values, formikBag) => {
    console.log('values', values);
    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      if (val !== null && val !== '') formData.append(key, val);
    });
    formData.set('petTypeId', Number(values.petTypeId));
    createPet(formData);
    formikBag.resetForm();
  };

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Report a missing pet</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {formikProps => (
          <Form className={styles.form}>
            <div className={styles.grid}>
              {/* Pet's name field*/}
              <div className={styles.field}>
                <label className={styles.label}>Pet's Name *</label>
                <Field
                  name='name'
                  placeholder='e.g. Buddy'
                  autoFocus
                  className={classNames(styles.input, {
                    [styles.valid]:
                      !formikProps.errors.name && formikProps.touched.name,
                    [styles.invalid]:
                      formikProps.errors.name && formikProps.touched.name,
                  })}
                />
                <ErrorMessage
                  name='name'
                  component='span'
                  className={styles.error}
                />
              </div>

              {/* Pet's type field*/}
              <div className={styles.field}>
                <label className={styles.label}>Pet Type *</label>
                <Field
                  as='select'
                  name='petTypeId'
                  className={classNames(styles.input, styles.select, {
                    [styles.valid]:
                      !formikProps.errors.petTypeId &&
                      formikProps.touched.petTypeId,
                    [styles.invalid]:
                      formikProps.errors.petTypeId &&
                      formikProps.touched.petTypeId,
                  })}
                >
                  <option value='' disabled>
                    Select type
                  </option>
                  {petTypes.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.type}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name='petTypeId'
                  component='span'
                  className={styles.error}
                />
              </div>

              {/* Owner field*/}
              <div className={styles.field}>
                <label className={styles.label}>Owner *</label>
                <Field
                  name='owner'
                  placeholder='e.g. John Smith'
                  className={classNames(styles.input, {
                    [styles.valid]:
                      !formikProps.errors.owner && formikProps.touched.owner,
                    [styles.invalid]:
                      formikProps.errors.owner && formikProps.touched.owner,
                  })}
                />
                <ErrorMessage
                  name='owner'
                  component='span'
                  className={styles.error}
                />
              </div>

              {/* Owner Contacts field*/}
              <div className={styles.field}>
                <label className={styles.label}>Your Contacts *</label>
                <Field
                  name='ownerContacts'
                  placeholder='+123456789012'
                  className={classNames(styles.input, {
                    [styles.valid]:
                      !formikProps.errors.ownerContacts &&
                      formikProps.touched.ownerContacts,
                    [styles.invalid]:
                      formikProps.errors.ownerContacts &&
                      formikProps.touched.ownerContacts,
                  })}
                />
                <ErrorMessage
                  name='ownerContacts'
                  component='span'
                  className={styles.error}
                />
              </div>

              {/* City field*/}
              <div className={styles.field}>
                <label className={styles.label}>City *</label>
                <Field
                  as='select'
                  name='city'
                  className={classNames(styles.input, styles.select, {
                    [styles.valid]:
                      !formikProps.errors.city && formikProps.touched.city,
                    [styles.invalid]:
                      formikProps.errors.city && formikProps.touched.city,
                  })}
                >
                  <option value='' disabled>
                    Select city
                  </option>
                  {CONSTANTS.CITIES.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name='city'
                  component='span'
                  className={styles.error}
                />
              </div>

              {/* Lost date field*/}
              <div className={styles.field}>
                <label className={styles.label}>Lost Date:</label>
                <Field
                  name='lostDate'
                  type='date'
                  className={classNames(styles.input, {
                    [styles.valid]:
                      !formikProps.errors.lostDate &&
                      formikProps.touched.lostDate,
                    [styles.invalid]:
                      formikProps.errors.lostDate &&
                      formikProps.touched.lostDate,
                  })}
                />
                <ErrorMessage
                  name='lostDate'
                  component='span'
                  className={styles.error}
                />
              </div>
            </div>

            {/* Photo field*/}
            <div className={styles.field}>
              <label className={styles.label}>Photo</label>
              <label className={styles.file_label}>
                <input
                  name='petImage'
                  type='file'
                  accept='image/*'
                  className={styles.file_input}
                  onChange={e =>
                    formikProps.setFieldValue(
                      'petImage',
                      e.currentTarget.files[0] ?? null
                    )
                  }
                />
                <span className={styles.file_button}>+ Add a file</span>
                <span className={styles.file_name}>
                  {formikProps.values.petImage
                    ? formikProps.values.petImage.name
                    : 'No file chosen'}
                </span>
              </label>
            </div>

            {/* Description field*/}
            <div className={styles.field}>
              <label className={styles.label}>Description:</label>
              <Field
                as='textarea'
                name='descritpion'
                placeholder='Describe appearance, special features...'
                rows={4}
                className={styles.input}
              />
            </div>

            <button
              className={styles.submit}
              type='submit'
              disabled={formikProps.isSubmitting}
            >
              {formikProps.isSubmitting ? 'Submitting...' : 'Add report'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
const mapStateToProps = ({ petsData: { petTypes } }) => ({ petTypes });
const mapDisatchToProps = dispatch => ({
  getTypes: () => dispatch(getTypesThunk()),
  createPet: values => dispatch(createPetThunk(values)),
});

export default connect(mapStateToProps, mapDisatchToProps)(PetsForm);
