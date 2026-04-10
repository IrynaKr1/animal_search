import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PiTrashDuotone } from 'react-icons/pi';
import {
  changePetTypeFilter,
  deletePetThunk,
  getPetsThunk,
  getTypesThunk,
  updatePetThunk,
} from '../../store/slices/petsSlice';
import CONSTANTS from '../../constants';
import styles from './PetsList.module.scss';

const IMAGE_BASE_URL = 'http://localhost:5000/images/';

function PetsList ({
  pets,
  petTypes,
  filter,
  isFetching,
  error,
  getTypes,
  getPets,
  changePetType,
  deletePetById,
  updatePetById,
}) {
  const { petType } = filter;

  useEffect(() => {
    getTypes();
  }, []);

  useEffect(() => {
    getPets(filter);
  }, [petType]);

  const handleFoundToggle = pet => {
    updatePetById({ id: pet.id, values: { isFound: !pet.isFound } });
  };

  const handleDelete = id => {
    console.log('handleDelete', id);
    deletePetById(id);
  };

  const formatDate = dateStr => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('pl-PL');
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Missing Pets List</h1>
        <Link to='/pets/create' className={styles.add_button}>
          + Add New Form
        </Link>
      </div>

      {/* Sidebar filters */}
      <aside>
        <div>
          <span className={styles.sidebar_header}>▽</span>
          <span>Filters</span>
        </div>

        <div className={styles.filter_group}>
          <label>Pet Type</label>
          <select
            value={petType ?? ''}
            onChange={e => changePetType(e.target.value || null)}
          >
            <option value=''>All</option>
            {petTypes.map(t => (
              <option key={t.id} value={t.id}>
                {t.type}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filter_group}>
          <label>City</label>
          <select defaultValue=''>
            <option value=''>All</option>
            {CONSTANTS.CITIES.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filter_group}>
          <label>Added from</label>
          <div>
            <span>📅</span>
            <input type='date' placeholder='Choose a date' />
          </div>
        </div>

        <p>
          Found: {pets.length} of {pets.length}
        </p>
      </aside>

      {/* Pets list*/}
      <main>
        {pets.map(pet => (
          <div key={pet.id} className={styles.card}>
            <div className={styles.card_image_wrapper}>
              {pet.petImage ? (
                <img
                  src={`${IMAGE_BASE_URL}${pet.petImage}`}
                  alt={pet.name}
                  className={styles.card_image}
                />
              ) : (
                <div>🐾</div>
              )}
            </div>

            <div className={styles.card_body}>
              <h2 className={styles.card_name}>{pet.name}</h2>
              <p>
                {petTypes.find(t => t.id === pet.petTypeId)?.type} · {pet.city}
              </p>
              <p>Created: {formatDate(pet.createdAt)}</p>

              <div className={styles.card_footer}>
                <label className={styles.found_toggle}>
                  <input
                    type='checkbox'
                    checked={pet.isFound}
                    onChange={() => handleFoundToggle(pet)}
                  />
                  <span>Is Found</span>
                </label>

                <button
                  className={styles.delete_button}
                  onClick={() => handleDelete(pet.id)}
                  aria-label='Delete form'
                >
                  <PiTrashDuotone />
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
const mapStateToProps = ({ petsData }) => petsData;
const mapDispatchToProps = dispatch => ({
  getPets: data => dispatch(getPetsThunk(data)),
  getTypes: () => dispatch(getTypesThunk()),
  changePetType: data => dispatch(changePetTypeFilter(data)),
  deletePetById: id => dispatch(deletePetThunk(id)),
  updatePetById: data => dispatch(updatePetThunk(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PetsList);
