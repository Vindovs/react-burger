import {
    getUserInfo,
    createUser,
    updateUserInfo,
    loginUser,
    logoutUser,
    tryResetPassword,
    resetPassword

} from "../actions/auth";

const initialState = {
    user: null,
    errorMessage: '',
    resetPasswordEmailSent: false,
    createUserPending: false,
    passwordIsSet: false,
    isAuthChecked: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case getUserInfo.fulfilled.type:
            return {
                ...state,
                user: action.payload && action.payload.user || state.user,
                isAuthChecked: true
            };

        case getUserInfo.rejected.type:
            return {
                ...state,
                isAuthChecked: true
            };

        case updateUserInfo.fulfilled.type:
            return {
                ...state,
                user: action.payload.user || state.user
            };

        case loginUser.pending.type:
            return {
                ...state,
                errorMessage: 'loginUser error'
            };

        case loginUser.fulfilled.type:
            return {
                ...state,
                user: action.payload || state.user
            };

        case loginUser.rejected.type:
            return {
                ...state,
                errorMessage: action.error.message
            };

        case logoutUser.fulfilled.type:
            return {
                ...state,
                user: null
            };

        case createUser.pending.type:
            return {
                ...state,
                createUserPending: true,
                errorMessage: 'createUser error'
            };

        case createUser.fulfilled.type:
            return {
                ...state,
                createUserPending: false,
                user: action.payload || state.user
            };

        case createUser.rejected.type:
            return {
                ...state,
                createUserPending: false,
                errorMessage: action.error.message
            };

        case getUserInfo.pending.type:
            return {
                ...state,
                isAuthChecked: false
            };

        case tryResetPassword.fulfilled.type:
            return {
                ...state,
                resetPasswordEmailSent: true,
                passwordIsSet: false
            };

        case resetPassword.fulfilled.type:
            return {
                ...state,
                passwordIsSet: true
            };

        case 'resetPasswordResponse':
            return {
                ...state,
                tryResetPassword: null,
                message: null
            }

        default:
            return state;
    }
};

export default userReducer;