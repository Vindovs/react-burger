import { combineReducers } from "@reduxjs/toolkit";
import IngredientsReducer from './ingredients-reduser';
import BurgerConstructorReducer from './burger-constructor-reducer';
import CurrentOpenIngredientReducer from './current-open-ingredient-reducer';
import CreatedOrderReducer from './created-order-reducer';


export const rootReducer = combineReducers({
    data: IngredientsReducer,
    burgerConstructor: BurgerConstructorReducer,
    currentOpenIngredient: CurrentOpenIngredientReducer,
    createdOrder: CreatedOrderReducer
});