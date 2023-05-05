import axios from "axios";

const apiURL = "http://localhost:8080/";

const api = axios.create({baseURL: apiURL});


api.interceptors.response.use(
    (res) => res.data,
    (err) => {
        alert(err);
        window.location.href = "/login";
        return Promise.reject(err);
    }
);
api.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = token;
    }
    req.headers["Content-Type"] = "application/json";
    return req;
});
async function getRequest(uri, params = null) {
    return await api.get(uri, getConfig(params));
}

async function postRequest(uri, data, params=null) {
    return await api.post(uri, data, getConfig(params));
}

async function putRequest(uri, data, params=null) {
    return await api.put(uri, data, getConfig(params));
}

async function patchRequest(uri, data, params=null) {
    return await api.patch(uri, data, getConfig(params));
}

async function deleteRequest(uri, data, params=null) {
    return await api.delete(uri, data, getConfig(params));
}

function getConfig(params) {
    if (params) {
        return {params};
    }
    return {};
}

export const apiService = {
    getRequest,
    postRequest,
    putRequest,
    patchRequest,
    deleteRequest,
};