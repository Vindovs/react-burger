import {GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_REQUEST_SUCCESS,
    GET_INGREDIENTS_REQUEST_FAILED} from '../actions/index';

import { TIngredient } from '../../utils/types';

interface IInitialState{
    data: Array<IInitialState>;
    dataRequested: boolean;
}    

const initialState: IInitialState = {
    data: [],
    dataRequested: false,
}    

interface IIngredientsAction {
    type: typeof GET_INGREDIENTS_REQUEST | typeof GET_INGREDIENTS_REQUEST_SUCCESS | typeof GET_INGREDIENTS_REQUEST_FAILED,
    payload: TIngredient | undefined;
    errorMessage: string | undefined;
}
const IngredientsReducer = (state: IInitialState = initialState, action: IIngredientsAction) => {    switch(action.type){
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                dataRequested: false,
            };
        } 
        case GET_INGREDIENTS_REQUEST_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                dataRequested: true
            }
        }
        case GET_INGREDIENTS_REQUEST_FAILED: {
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        }
        
    default: {
            return state;
        }
    }
}

export default IngredientsReducer;