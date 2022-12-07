import axios from 'axios';
import { API_URL_DOMAIN , USER_LOGIN} from '../utils/constant';
import { history } from '../utils/history';

var token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyZWQiOiIxMC8yMi8yMDQ1IDEwOjM3OjU1IFBNIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImI5Mzc2NDk3LTE2NzgtNDJlMC1iOGY4LWQ1Y2NhYTAzMjc0ZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJDX0tIIiwiQU5ZIiwiQ19MTCIsIkNfTE9QIiwiQ19ORCIsIkNIRUNLX01FTlRPUl9MT1AiLCJEX0RBTkgiLCJEX0tIIiwiRF9MTCIsIkRfTkQiLCJGX0dDIiwiRl9MT1AiLCJHRF9MSCIsIktfVFQiLCJOX1FVWUVOIiwiUUxfQkwiLCJRTF9CTSIsIlFMX0NMIiwiUUxfR0MiLCJRTF9ITVQiLCJRTF9LSCIsIlFMX0xUIiwiUUxfVFQiLCJSX0JIIiwiUl9LSCIsIlJfTEwiLCJSX0xPUCIsIlJfTkQiLCJSX1ZMIiwiVV9LSCIsIlVfTEwiLCJVX0xPUCIsIlVfTkQiLCJYX0tIX0wiLCJRTF9MQ04iLCJRTF9US0QiLCJRTF9DSFRMIiwiUUxfUk0iLCJEX0JUIl0sIm5iZiI6MTY2NjQ1MzA3NSwiZXhwIjoxNjY2NDU2Njc1fQ.fIwoFacMNwqu0nkUD7oXCUfusiBD9voE0PnQDtR1d3A";

const setToken = () => {}

//     if (localStorage.getItem(USER_LOGIN)) {
//         let user = JSON.parse(localStorage.getItem(USER_LOGIN));

//         token = user.token;

//     }
// }

export const get = (url, ...params) => {
    setToken();

    return axios({
        baseURL: API_URL_DOMAIN,
        url: url,
        params: params,
        method: 'GET',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {

            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }).catch(err => err.response.status === 401 || err.response.status === 403 && history.push("/login"))


}

export const post = (url, data) => {
    setToken();
    return axios({
        baseURL: API_URL_DOMAIN,
        url: url,
        method: 'POST',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {

            'Authorization': 'Bearer ' + token,

            'Content-Type': 'application/json'
        },
        // timeout: 1000,
        data: JSON.stringify(data)

    }).catch(err => err.response.status === 401 || err.response.status === 403 && history.push("/login"))
}

export const put = (url, data) => {
    setToken();
    return axios({
        baseURL: API_URL_DOMAIN,
        url: url,
        method: 'PUT',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {

            'Authorization': 'Bearer ' + token,

            'Content-Type': 'application/json'
        },
        // timeout: 1000,
        data: JSON.stringify(data)
    }).catch(err => err.response.status === 401 || err.response.status === 403 && history.push("/login"))
}

export const remove = (url, ids) => {
    setToken();
    return axios({
        baseURL: API_URL_DOMAIN,
        url: url,
        method: 'DELETE',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {

            'Authorization': 'Bearer ' + token,

            'Content-Type': 'application/json'
        },
        data: JSON.stringify(ids)
        // timeout: 1000
    }).catch(err => err.response.status === 401 || err.response.status === 403 && history.push("/login"))
}

export const postForm = (url, data) => {
    setToken();
    return axios({
        baseURL: API_URL_DOMAIN,
        url: url,
        method: 'POST',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {

            'Authorization': 'Bearer ' + token,

            'Content-Type': 'application/json'
        },
        // timeout: 1000,
        data: data

    }).catch(err => err.response.status === 401 || err.response.status === 403 && history.push("/login"))
}

export const putForm = (url, data) => {
    setToken();
    // console.log(url,"url","data",data)
    return axios({
        baseURL: API_URL_DOMAIN,
        url: url,
        method: 'POST',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {

            'Authorization': 'Bearer ' + token,

            'Content-Type': 'application/json'
        },
        // timeout: 1000,
        data: data

    }).catch(err => err.response.status === 401 || err.response.status === 403 && history.push("/login"))
}

export const BaseApi = {
    get,
    post,
    put,
    remove,
    postForm,
    putForm
}