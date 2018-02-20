import axios from 'axios';

export const post = (endpoint, body, params) => {
    return new Promise((resolve, reject) => {
        axios.post(endpoint, body).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error.response.data);
        });
    });
};

export const get = (endpoint, body, params) => {
    return new Promise((resolve, reject) => {
        axios.get(endpoint).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
};
