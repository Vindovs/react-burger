import {ADD_INGREDIENT, DELETE_INGREDIENT,
    SET_BUNS_CONSTRUCTOR, REMOVE_INGREDIENTS,
    RESET_INGREDIENT
} from '../actions/index';
import { TIngredient } from '../../utils/types';

const initialState : IBurgerConstructorState  = {
    bun: [],
    body: [],
}

interface IBurgerConstructorAction{
    type: typeof ADD_INGREDIENT | typeof DELETE_INGREDIENT | typeof SET_BUNS_CONSTRUCTOR | typeof REMOVE_INGREDIENTS | typeof RESET_INGREDIENT,
    payload: Array<TIngredient> | TIngredient | null | undefined;
    index: number;
}
interface IBurgerConstructorState{
    bun: Array<TIngredient> | null;
    body: Array<TIngredient> 
}

const BurgerConstructorReducer  = (state = initialState, action : IBurgerConstructorAction) => {
    switch(action.type){
        case ADD_INGREDIENT:{
            return {
                ...state,
                body: [
                    ...state.body,
                    action.payload
                ]
            };
        }
        case DELETE_INGREDIENT:{
            return {
                ...state,
                body: {...state}.body.filter((_, key) => key !== action.index)
            };
        }
        case SET_BUNS_CONSTRUCTOR:{
            return {
                ...state,
                bun: [
                    action.payload,
                    action.payload
                ]
            };
        }
        case REMOVE_INGREDIENTS:{
            return {
                bun: [],
                body: []
            };
        }
        case RESET_INGREDIENT:{
            return {
                ...state,
                body: action.payload
            };
        }
        default:{
            return state;
        }
    }
}

export default BurgerConstructorReducer;