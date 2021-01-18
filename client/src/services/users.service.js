import axios from 'axios';
import CONFIG from '../config';

export const getAllUsers = () => axios({
    method: 'get',
    url: `${CONFIG.baseUrl}/users`

}).then(response => response.data);

export const deleteUser = (id) => axios({
    method: 'delete',
    url: `${CONFIG.baseUrl}/user/${id}`
}).then(response => response.data);

export const createUser = (data) => axios({
    method: 'post',
    url: `${CONFIG.baseUrl}/user`,
    data: data
});

export const getOneUser = (id) => axios({
    method: 'get',
    url: `${CONFIG.baseUrl}/user/${id}`

}).then(response => response.data);
