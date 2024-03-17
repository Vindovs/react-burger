import { CREATE_ORDER_REQUEST, CREATE_ORDER_REQUEST_SUCCESS, CREATE_ORDER_REQUEST_FAIL } from '../actions';

const initialState = {
    isCreating: false,
    isCreated: false,
    orderNumber: null,
    name: '',
    isError: false,
    errorText: '',
}

const CreatedOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST: {
            return {
                ...state,
                isCreating: true,
                isError: false,
                errorText: ''
            }
        }
        case CREATE_ORDER_REQUEST_SUCCESS: {
            return {
                ...state,
                orderNumber: action.payload.order.number,
                name: action.payload.name,
                isCreating: false,
                isCreated: true,
            }
        }
        case CREATE_ORDER_REQUEST_FAIL: {
            return {
                ...state,
                isCreating: false,
                isError: true,
                errorText: action.errorMessage
            }
        }
        default: {
            return state;
        }
    }
}

export default CreatedOrderReducer;