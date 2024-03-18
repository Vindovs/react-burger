import { CREATE_ORDER_REQUEST, CREATE_ORDER_REQUEST_SUCCESS, CREATE_ORDER_REQUEST_FAIL } from '../actions';
import { TOrderResponse } from '../../utils/types';

const initialState :IOrderState = {
    isCreating: false,
    isCreated: false,
    orderNumber: null,
    name: '',
    isError: false,
    errorText: '',
}

interface IOrderState{
    isCreating: boolean;
    isCreated: boolean;
    orderNumber: number | null;
    name: string | null;
    isError: boolean;
    errorText: string | null | undefined;
}

interface IOrderAction{
    type: typeof CREATE_ORDER_REQUEST | typeof CREATE_ORDER_REQUEST_SUCCESS | typeof CREATE_ORDER_REQUEST_FAIL;
    payload: TOrderResponse;
    errorMessage: string | null;
}

const CreatedOrderReducer = (state : IOrderState = initialState, action: IOrderAction) => {
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