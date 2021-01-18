import axios from 'axios';
import CONFIG from '../config';

export const getAllMovies = () => axios({
    method: 'get',
    url: `${CONFIG.baseUrl}/movies`

}).then(response => response.data);
