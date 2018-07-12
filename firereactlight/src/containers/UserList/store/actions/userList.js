import * as actionTypes from './actionTypesUserList'
import axios from '../../../../axios-orders'
import FireConnnect from '../../../../FireConnnect'


export const getUsersStart = () => {
    return {
        type: actionTypes.GETUSERS_START
    };
};

export const getUsersSuccess = (usersData) => {
    return {
        type: actionTypes.GETUSERS_SUCCESS,
        usersData: usersData
    };
};

export const getUsersFail = (error) => {
    return {
        type: actionTypes.GETUSERS_FAIL,
        error: error
    };
};

export const deleteUserStart = () => {
    return {
        type: actionTypes.GETUSERS_START
    };
};

export const  deleteUserSuccess = (usersData) => {
    return {
        type: actionTypes.DELETEUSER_SUCCESS,
        usersData: usersData
    }
};

export const  deleteUserResetSuccess = () => {
    return  {
        type: actionTypes.DELETEUSER_RESETSUCCESS
    }
};

export const deleteUserFail = (error) => {
    return {
        type: actionTypes.DELETEUSER_FAIL,
        error: error
    };
};

export const resetMessage = () => {
    return {
        type: actionTypes.RESETMESSAGE_START,
    };
};

export const deleteUser = (uid) => {
    return dispatch => {
        FireConnnect.database().ref('users/'+uid).remove()
            // if you forget to use arrowfunction here you cant use the keyword "this"
            .then(response => {
                console.log('UserDeleted');
                dispatch(deleteUserSuccess(response));
                dispatch(getUsers());
            })
            .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
                dispatch(deleteUserFail(error));
                // ...
            });
    };
};



export const getUsers = () => {
    return dispatch => {
        //...
        dispatch(getUsersStart());
        let ref = FireConnnect.database().ref('/users')
        ref.once("value")
            .then(response => {
                console.log(response.val())
                dispatch(getUsersSuccess(response.val()));
            })
            .catch(error => {
                dispatch(getUsersFail());
            });
    };
};
