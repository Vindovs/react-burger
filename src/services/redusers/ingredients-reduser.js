import {GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_REQUEST_SUCCESS,
    GET_INGREDIENTS_REQUEST_FAILED} from '../actions/index';
    
const initialState = {
        data: [],
        dataRequested: false,
    }    

const IngredientsReducer = (state = initialState, action) => {
    switch(action.type){
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