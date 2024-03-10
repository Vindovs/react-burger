import { combineReducers } from "@reduxjs/toolkit";
import IngredientsReducer from './ingredients-reduser';
import BurgerConstructorReducer from './burger-constructor-reducer';
import CreatedOrderReducer from './created-order-reducer';
import userReducer from './auth-reduser';

export const rootReducer = combineReducers({
    data: IngredientsReducer,
    burgerConstructor: BurgerConstructorReducer,
    createdOrder: CreatedOrderReducer,
    user: userReducer
});