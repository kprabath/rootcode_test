import axios from 'axios';
import {BASE_URL} from '../constants/Api';

export const getTrackData = searchString => {
  let query = `${BASE_URL}?term=${encodeURIComponent(searchString)}&limit=25`;
  return axios.get(query);
};
