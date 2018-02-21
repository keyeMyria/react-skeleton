import axios from 'axios';

export const post = (endpoint, body, params) => {
    return new Promise((resolve, reject) => {
        axios.post(`/api${endpoint}`, body).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error.response.data);
        });
    });
};

export const patch = (endpoint, body, params) => {
    return new Promise((resolve, reject) => {
        axios.patch(`/api${endpoint}`, body).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error.response.data);
        });
    });
};

export const get = (endpoint, body, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api${endpoint}`).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
};
