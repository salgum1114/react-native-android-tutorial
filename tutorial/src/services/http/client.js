import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    baseURL: 'http://192.168.20.240:3000',
    timeout: 30000,
    withCredentials: true,
});

const requestInterceptor = (method, url, data, headers, responseType) => {
    let defaultHeaders = {};
    const options = {
        method,
        url,
        // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
        responseType: responseType || 'json',
        headers: defaultHeaders,
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }),
    };
    if (data && (method === 'GET' || method === 'DELETE')) {
        options.params = data;
    } else if (data) {
        options.data = JSON.stringify(data);
        options.headers = Object.assign(options.headers, {
            'Content-Type': 'application/json',
        });
    }
    if (headers) {
        options.headers = Object.assign(options.headers, headers);
    }
    return new Promise((resolve, reject) => {
        instance.request(options)
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                if (error.response) {
                    error.message = error.response.data ? error.response.data.message : `${error.response.status} ${error.response.statusText}`;
                } else {
                    error.message = error.message || `${error.status} ${error.statusText}`;
                }
                reject(error);
            });
    });
};

const client = {
    get(url, data, headers, responseType) {
        return requestInterceptor('GET', url, data, headers, responseType);
    },
    post(url, data, headers, responseType) {
        return requestInterceptor('POST', url, data, headers, responseType);
    },
    delete(url, data, headers, responseType) {
        return requestInterceptor('DELETE', url, data, headers, responseType);
    },
    put(url, data, headers, responseType) {
        return requestInterceptor('PUT', url, data, headers, responseType);
    },
    all(requests) {
        return Promise.all(requests);
    },
};

export default client;
