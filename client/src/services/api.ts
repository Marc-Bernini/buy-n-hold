import axios from 'axios';
const baseURL = "http://localhost:4242";

const setHeadersToRequest = (): any | null => {

    // if (userInformations) {
    //     const parseUserInformations: Auth = JSON.parse(userInformations);
    //     return {
    //         Authorization: `Bearer ${parseUserInformations.access_token}`
    //     };
    // }
    return null;
}

export const post = (body: any, route: string) => {
    const headers = setHeadersToRequest();
    return axios.post(`${baseURL}/${route}`, body, {
        headers
    });

}
