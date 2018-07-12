import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userId: null,
    error: null,
    loading: false,
    isLogged: false,
    user: {
        name: null,
        userId: null,
        error: null,
        loading: false,
    },
    snackMessage: {
        open: false,
        message: '',
    }
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.authData.uid,
        userName: action.authData.email,
        error: null,
        loading: false,
        isLogged: true,
        theme: action.authData.theme,
        user: {
            userName: action.authData.email,
            userId: action.authData.uid,
        },
        snackMessage: {
            open: true,
            message: 'Welcome ' + action.authData.email,
        }
    });
};


const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        snackMessage: {
            open: true,
            message: action.error.message,
        }
    });
};

const reLogSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.authData.uid,
        userName: action.authData.email,
        error: null,
        loading: false,
        isLogged: true,
        theme: action.authData.theme,
        user: {
            userName: action.authData.email,
            userId: action.authData.uid,
        },
    });
};

const createUserStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const createUserSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        snackMessage: {
            open: true,
            message: 'Account successfully created'
        },

    });
};

const createUserFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        snackMessage: {
            open: true,
            message: action.error.message,
        },
    });
};

const savingThemeStart = (state, action) => {
    return updateObject(state, {
        error: null,
        snackMessage: {
            open: false,
            message: 'Theme saved'
        }
    });
};

const savingThemeSuccess = (state, action) => {
    return updateObject(state, { error: null });
};

const savingThemeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        snackMessage: {
            open: true,
            message: action.error.message,
        },
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        isLogged: false,
        userId: null,
        user: null,
        snackMessage: {
            open: true,
            message: 'Bye',
        }
    });
};

const closeMessage = (state, action) => {
    return updateObject(state, {
        snackMessage: {
            ...state.snackMessage,
            open: false,
        }
    });
};

// const setAuthRedirectPath = (state, action) => {
//     return updateObject(state, { authRedirectPath: action.path })
// }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_START: return authStart(state, action);
        case actionTypes.REGISTER_SUCCESS: return authSuccess(state, action);
        case actionTypes.REGISTER_FAIL: return authFail(state, action);

        case actionTypes.LOGIN_START: return authStart(state, action);
        case actionTypes.LOGIN_SUCCESS: return authSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return authFail(state, action);

        case actionTypes.RELOGIN_SUCCESS: return reLogSuccess(state, action);

        case actionTypes.CREATEUSER_START: return createUserStart(state, action);
        case actionTypes.CREATEUSER_SUCCESS: return createUserSuccess(state, action);
        case actionTypes.CREATEUSER_FAIL: return createUserFail(state, action);

        case actionTypes.SAVINGTHEME_START: return savingThemeStart(state, action);
        case actionTypes.SAVINGTHEME_SUCCESS: return savingThemeSuccess(state, action);
        case actionTypes.SAVINGTHEME_FAIL: return savingThemeFail(state, action);

        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.CLOSEMESSAGE: return closeMessage(state, action);

        // case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
};

export default reducer;