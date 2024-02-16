import { SET_INGREDIENT } from '../actions'

const initialState = {
    item: null,
}

const CurrentOpenIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INGREDIENT: {
            return {
                ...state,
                item: action.payload
            };
        }
        
        default: {
            return state;
        }
    }
}

export default CurrentOpenIngredientReducer;