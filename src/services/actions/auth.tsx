import { createAsyncThunk } from "@reduxjs/toolkit";
import { url } from '../../common';
import { TResponse, TUserLogInResponse } from "../../utils/types";

export const getUserInfo = createAsyncThunk(
    "auth/getUserInfo",
    async () => {

        const token = localStorage.getItem('accessToken');

        if (!token) {
            return Promise.reject("reject");
        }

        return await fetchAndRefresh(url + '/api/auth/user', {

            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
    }
)

export const createUser = createAsyncThunk(
    "auth/createUser",
    async (userCredentials) => {

        const request = await handleRequest<TUserLogInResponse>(url + '/api/auth/register', {

            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        })
            .then(res => {
                let accessToken : string = res.accessToken.split("Bearer ").pop() || ''
                localStorage.setItem("refreshToken", res.refreshToken);
                localStorage.setItem("accessToken", accessToken);

                return res.user;
            });

        return request;
    }
)

export const tryResetPassword = createAsyncThunk(
    "auth/tryResetPassword",
    async (email) => {

        const requestBody = { email };
        return await handleRequest<TResponse>(url + '/api/password-reset', {

            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
    }
)

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (requestBody) => {

        return await handleRequest<TResponse>(url + '/api/password-reset/reset', {

            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
    }
)

export const updateUserInfo = createAsyncThunk(
    "auth/updateUserInfo",
    async (userInfo) => {

        const token = localStorage.getItem('accessToken');

        return await fetchAndRefresh(url + '/api/auth/user', {

            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(userInfo)
        });
    }
)

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userCredentials) => {

        const request = await handleRequest<TUserLogInResponse>(url + '/api/auth/login', {

            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        })
            .then(res => {
                let accessToken : string = res.accessToken.split("Bearer ").pop() || ''

                localStorage.setItem("refreshToken", res.refreshToken);
                localStorage.setItem("accessToken", accessToken);

                return res.user;
            })

        return request;
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async () => {
        const request = await handleRequest<TResponse>(url + '/api/auth/logout', {

            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken")
            })
        })
            .then(res => {
                if (res.success) {
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("accessToken");
                }

                return res;
            });

        return request;
    }
)

export function handleRequest<T>(url:string, options = {}) : Promise<T> {
    return fetch(url, options)
        .then(checkRes)
        .then(data => {
            console.log(data);

            return data;
        })
}

export const fetchAndRefresh = async (url:string, options :any) => {
    try {
        const res = await fetch(url, options);

        return await checkRes(res);
    }
    catch (err : string | any) {
        if (err.message === "err") {

            const refreshData = await refreshToken();

            options.headers.authorization = refreshData.accessToken;

            const res = await fetch(url, options);

            return await checkRes(res);
        }
    }
}

export const refreshToken = async () : Promise <any> => {
    return await fetch(url + '/api/auth/token', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        })
    })
        .then(checkRes)
        .then((refreshData) => {
            if (!refreshData.success) {
                return Promise.reject("reject");
            }

            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken.split("Bearer ").pop());

            return refreshData;
        })
}

export function handleSighInRequest(url : string, options = {}) {
    return fetch(url, options)
        .then(checkRes)
        .then(data => {
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("accessToken", data.accessToken);

            return data;
        })
}

export const checkRes = (res : Response) : Promise<any>  => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
