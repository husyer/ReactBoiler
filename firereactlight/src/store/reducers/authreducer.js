import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    isLogged: false
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    console.log(action)
    return updateObject( state, { 
        token: action.authData.displayName,
        userId: action.authData.uid,
        userName: action.authData.email,
        error: null,
        loading: false,
        isLogged: true,
        theme : action.authData.theme
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const createUserStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const createUserSuccess = (state, action) => {
    console.log(action)
    return updateObject( state, { error: null, loading: false } );
};

const createUserFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const savingThemeStart = ( state, action ) => {
    return updateObject( state, { error: null } );
};

const savingThemeSuccess = (state, action) => {
    console.log(action)
    return updateObject( state, { error: null } );
};

const savingThemeFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { isLogged: false, userId: null });
};

// const setAuthRedirectPath = (state, action) => {
//     return updateObject(state, { authRedirectPath: action.path })
// }

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.REGISTER_START: return authStart(state, action);
        case actionTypes.REGISTER_SUCCESS: return authSuccess(state, action);
        case actionTypes.REGISTER_FAIL: return authFail(state, action);
        case actionTypes.LOGIN_START: return authStart(state, action);
        case actionTypes.LOGIN_SUCCESS: return authSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return authFail(state, action);
        case actionTypes.CREATEUSER_START: return createUserStart(state, action);
        case actionTypes.CREATEUSER_SUCCESS: return createUserSuccess(state, action);
        case actionTypes.CREATEUSER_FAIL: return createUserFail(state, action);
        case actionTypes.SAVINGTHEME_START: return savingThemeStart(state, action);
        case actionTypes.SAVINGTHEME_SUCCESS: return savingThemeSuccess(state, action);
        case actionTypes.SAVINGTHEME_FAIL: return savingThemeFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        // case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
};

export default reducer;