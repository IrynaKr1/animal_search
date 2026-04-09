import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  changePetTypeFilter,
  getPetsThunk,
  getTypesThunk,
} from '../../store/slices/petsSlice';

function PetsList ({
  pets,
  petTypes,
  filter,
  isFetching,
  error,
  getTypes,
  getPets,
  changePetType,
}) {
  const { petType } = filter;

  useEffect(() => {
    getTypes();
  }, []);

  useEffect(() => {
    getPets(filter);
  }, [petType]);

  return (
    <>
      <section>
        {petTypes.map(t => (
          <label key={t.id}>
            <input
              type='radio'
              name='petType'
              value={t.id}
              checked={petType === t.id}
              onChange={() => changePetType(t.id)}
            />
            {t.type}
          </label>
        ))}
      </section>
      <ul>
        {pets.map(p => (
          <li key={p.id}>
            <p>{p.createdAt}</p>
            <p>
              {p.name}, {p.descritpion}
            </p>
            <p>
              {p.owner}, {p.ownerContacts}, {p.city}
            </p>
            <p>{p.lostDate}</p>
            <p>{petTypes.find(t => t.id === p.petTypeId)?.type}</p>
            <p>{p.petImage}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
const mapStateToProps = ({ petsData }) => petsData;
const mapDisatchToProps = dispatch => ({
  getPets: data => dispatch(getPetsThunk(data)),
  getTypes: () => dispatch(getTypesThunk()),
  changePetType: data => dispatch(changePetTypeFilter(data)),
});
export default connect(mapStateToProps, mapDisatchToProps)(PetsList);
