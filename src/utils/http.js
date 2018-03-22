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

export const put = (endpoint, body, params) => {
    return new Promise((resolve, reject) => {
        axios.put(`/api${endpoint}`, body).then(response => {
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

export const get = (endpoint, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api${endpoint}`, {params: params}).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
};

export const del = (endpoint, body, params) => {
    return new Promise((resolve, reject) => {
        axios.delete(`/api${endpoint}`).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
};
