// src/pages/PetPage/index.jsx
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPetByIdThunk, getTypesThunk } from '../../store/slices/petsSlice';
import styles from './PetData.module.scss';

const IMAGE_BASE_URL = 'http://localhost:5000/images/';

function PetData ({ currentPet, petTypes, isFetching, getPetById, getTypes }) {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getTypes();
    getPetById(id);
  }, [id]);

  const formatDate = dateStr => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('pl-PL');
  };

  if (isFetching || !currentPet) {
    return (
      <div className={styles.page}>
        <p className={styles.loading}>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <button className={styles.back_btn} onClick={() => history.goBack()}>
        ← Back
      </button>

      <div className={styles.layout}>
        <div className={styles.image_wrapper}>
          <img
            src={
              currentPet.petImage
                ? `${IMAGE_BASE_URL}${currentPet.petImage}`
                : '/default_img.jpg'
            }
            alt={currentPet.name}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.content_header}>
            <h1 className={styles.title}>{currentPet.name}</h1>
            <span
              className={
                currentPet.isFound ? styles.badge_found : styles.badge_lost
              }
            >
              {currentPet.isFound ? 'Found' : 'Lost'}
            </span>
          </div>

          <dl className={styles.details}>
            <div className={styles.detail_row}>
              <dt className={styles.detail_label}>Animal type</dt>
              <dd className={styles.detail_value}>
                {petTypes.find(t => t.id === currentPet.petTypeId)?.type ?? '—'}
              </dd>
            </div>
            <div className={styles.detail_row}>
              <dt className={styles.detail_label}>Owner</dt>
              <dd className={styles.detail_value}>{currentPet.owner}</dd>
            </div>
            <div className={styles.detail_row}>
              <dt className={styles.detail_label}>Contact</dt>
              <dd className={styles.detail_value}>
                {currentPet.ownerContacts}
              </dd>
            </div>
            <div className={styles.detail_row}>
              <dt className={styles.detail_label}>City</dt>
              <dd className={styles.detail_value}>{currentPet.city}</dd>
            </div>
            <div className={styles.detail_row}>
              <dt className={styles.detail_label}>Date lost</dt>
              <dd className={styles.detail_value}>
                {formatDate(currentPet.lostDate)}
              </dd>
            </div>
            <div className={styles.detail_row}>
              <dt className={styles.detail_label}>Added</dt>
              <dd className={styles.detail_value}>
                {formatDate(currentPet.createdAt)}
              </dd>
            </div>
            {currentPet.descritpion && (
              <div className={styles.detail_row}>
                <dt className={styles.detail_label}>Description</dt>
                <dd className={styles.detail_value}>
                  {currentPet.descritpion}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({
  petsData: { currentPet, petTypes, isFetching },
}) => ({
  currentPet,
  petTypes,
  isFetching,
});

const mapDispatchToProps = dispatch => ({
  getPetById: id => dispatch(getPetByIdThunk(id)),
  getTypes: () => dispatch(getTypesThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PetData);
