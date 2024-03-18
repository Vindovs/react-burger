import { url } from '../../common';
import {checkRes} from './auth'
import { TIngredientsResponse, TIngredient } from '../../utils/types';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_REQUEST_SUCCESS = 'GET_INGREDIENTS_REQUEST_SUCCESS';
export const GET_INGREDIENTS_REQUEST_FAILED = 'GET_INGREDIENTS_REQUEST_FAILED';
export const SET_BUNS_CONSTRUCTOR = 'SET_BUNS_CONSTRUCTOR';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT_DATA';
export const REMOVE_INGREDIENTS = 'REMOVE_INGREDIENTS';
export const RESET_INGREDIENT = 'RESET_INGREDIENT'
export const SET_INGREDIENT = 'SET_INGREDIENT';

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_REQUEST_SUCCESS = "CREATE_ORDER_REQUEST_SUCCESS";
export const CREATE_ORDER_REQUEST_FAIL = "CREATE_ORDER_REQUEST_FAIL";


export const dataFetch = () => { //@ts-ignore
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        handlRequest<TIngredientsResponse>(url + '/api/ingredients')
            .then(res => {
                dispatch({
                    type: GET_INGREDIENTS_REQUEST_SUCCESS,
                    payload: res.data
                });
            })
            .catch(e => {
                console.log('Error:' + e.message);
                dispatch({
                    type: GET_INGREDIENTS_REQUEST_FAILED,
                    errorMessage: e
                });
            })
    }
}

function handlRequest<T>( url: string, options : RequestInit = {} ) : Promise<T> {
    return fetch(url, options)
        .then(checkReponse)
        .then(data => {
            return data;
        })
}

const checkReponse = (res: Response) : Promise<any> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export interface IBurgerConstructor{
    
    bun: Array<TIngredient>
    body: Array<TIngredient>
}

export const createOrder = (burger: IBurgerConstructor) => {
    //@ts-ignore
    return function (dispatch) {
        dispatch({
            type: CREATE_ORDER_REQUEST
        });

        const requestBody = {
            ingredients: [
                burger.bun[0],
                ...burger.body,
                burger.bun[1],
            ]
        };

        handlRequest(url + '/api/orders', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(res => {
                console.log('CREATE_ORDER_REQUEST_SUCCESS', res);
                dispatch({
                    type: CREATE_ORDER_REQUEST_SUCCESS,
                    payload: res
                });

                dispatch({
                    type: REMOVE_INGREDIENTS
                });
            })
            .catch(e => {
                console.log('CREATE_ORDER_REQUEST_FAIL', e);
                dispatch({
                    type: CREATE_ORDER_REQUEST_FAIL,
                    errorMessage: e
                });
            })
    }
}