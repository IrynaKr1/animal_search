import axios from 'axios';
import queryString from 'query-string';

const httpClient = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getTypes = () => httpClient.get('/petTypes');
export const createPet = values => httpClient.post('/pets', values);
export const getPets = filter =>
  httpClient.get(`/pets?${queryString.stringify(filter)}`);
