import axios from 'axios';
import queryString from 'query-string';

const httpClient = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getTypes = () => httpClient.get('/petTypes');
export const createPet = values => httpClient.post('/pets', values);
export const getPets = filter =>
  httpClient.get(`/pets?${queryString.stringify(filter, { skipNull: true })}`);
export const deletePetById = id => httpClient.delete(`/pets/${id}`);
export const updatePetById = (id, values) =>
  httpClient.patch(`/pets/${id}`, values);
