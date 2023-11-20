import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_8x8BztuQuGUdABovdZfORgUj2APX3X4EMpvBwQE1J4JRDii33Q5XtqpuhUAzQoBO';

export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com';
  const END_POINT = '/v1/breeds';
  const url = BASE_URL + END_POINT;

  return axios.get(url).then(res => res.data);
}

export function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com';
  const END_POINT = '/v1/images/search';
  const PARAMS = `?breed_ids=${breedId}`;
  const url = BASE_URL + END_POINT + PARAMS;

  return axios.get(url).then(res => res.data);
}