import * as actionTypes from '../actions/actionTypesUserList';
import { updateObject } from '../../../../store/utility';

const initialState = {
    users: null,
    loading: true,
    snackMessage: {
        open:false,
        message:''
    }
};

const getUsersStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const getUsersSuccess = (state, action) => {
    console.log(action)
    return updateObject(state, {
        users: action.usersData,
        loading: false,
    });
};

const getUsersFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const deleteUserStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const deleteUserSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        snackMessage: {
            open:true,
            message:'UserDeleted'
        }
    });

};

const deleteUserSuccessDone = (state) => {
    return updateObject(state, {
        snackMessage: 'none'
    });
};


const deleteUserFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        snackMessage:'none',
    });
};

const resetMessageStart = (state, action) => {
    return updateObject(state, {
        snackMessage: {
            open:false,
            message:''
        }
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GETUSERS_START: return getUsersStart(state, action);
        case actionTypes.GETUSERS_SUCCESS: return getUsersSuccess(state, action);
        case actionTypes.GETUSERS_FAIL: return getUsersFail(state, action);
        case actionTypes.DELETEUSER_START: return deleteUserStart(state, action);
        case actionTypes.DELETEUSER_SUCCESS: return deleteUserSuccess(state, action);
        case actionTypes.DELETEUSER_RESETSUCCESS: return deleteUserSuccess(state, action);
        case actionTypes.DELETEUSER_FAIL: return deleteUserFail(state, action);
        case actionTypes.RESETMESSAGE_START: return resetMessageStart(state, action);
        default:
            return state;
    }
}

    export default reducer;