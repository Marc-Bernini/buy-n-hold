import axios from 'axios';
const baseURL = "http://localhost:4242";

const setHeadersToRequest = (token: string | null): any | null => {
    if (token) {
        return {
            Authorization: `Bearer ${token}`
        };
    }
    return null;
}

export const get = (route: string, token?: string) => {
    const headers = setHeadersToRequest(token);
    return axios.get(`${baseURL}/${route}`, {
        headers
    });
}

export const post = (body: any, route: string, token?: string) => {
    const headers = setHeadersToRequest(token);
    return axios.post(`${baseURL}/${route}`, body, {
        headers
    });
}
