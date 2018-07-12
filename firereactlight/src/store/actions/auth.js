import * as actionTypes from './actionTypes'

import FireConnnect, { provider, Emailprovider } from '../../FireConnnect'


export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    };
};

export const registerSuccess = (authData) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        authData: authData
    };
};

export const registerFail = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: error
    };
};

export const createUserStart = () => {
    return {
        type: actionTypes.CREATEUSER_START
    };
};

export const createUserSuccess = (authData) => {
    return {
        type: actionTypes.CREATEUSER_SUCCESS
    };
};

export const createUserFail = (error) => {
    return {
        type: actionTypes.CREATEUSER_FAIL,
        error: error
    };
};

export const logInStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const logInSuccess = (authData) => {
    console.log(authData)
    return {
        type: actionTypes.LOGIN_SUCCESS,
        authData: authData
    };
};

export const logInFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const savingThemeStart = () => {
    return {
        type: actionTypes.SAVINGTHEME_START
    };
};

export const savingThemeSuccess = () => {
    return {
        type: actionTypes.SAVINGTHEME_SUCCESS,
    };
};

export const savingThemeFail = (error) => {
    return {
        type: actionTypes.SAVINGTHEME_FAIL,
        error: error
    };
};

//CREATE A COPY OF USERS IN OUR DATABASE
export const createUser = (user) => {
    return dispatch => {
        //...

        dispatch(createUserStart());

        FireConnnect.database().ref('users/' + user.uid).set({
            uid: user.uid,
            email: user.email
        })
            // if you forget to use arrowfunction here you cant use the keyword "this"
            .then(response => {
                console.log(response)
                dispatch(createUserSuccess(response));
            })
            .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
                dispatch(createUserFail());
                // ...
            });
    };
};

export const register = (email, password) => {
    return dispatch => {
        //...
        dispatch(registerStart());
        FireConnnect.auth().createUserWithEmailAndPassword(email, password)
            // if you forget to use arrowfunction here you cant use the keyword "this"
            .then(response => {
                dispatch(createUser(response));
                console.log(response);
                dispatch(registerSuccess(response));

            })
            .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
                dispatch(registerFail());
                // ...
            });
    };
};

export const logIn = (email, password) => {
    return dispatch => {
        //...
        dispatch(logInStart());
        FireConnnect.auth().signInWithEmailAndPassword(email, password)
            // if you forget to use arrowfunction here you cant use the keyword "this"
            .then(response => {
                console.log(response)
                // dispatch(logInSuccess(response));

                let ref = FireConnnect.database().ref('users/' + response.uid)
                ref.once("value")
                    .then(response => {
                        console.log(response.val())
                        dispatch(logInSuccess(response.val()));
                    })
                        // ...
                    .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
                dispatch(logInFail());
                // ...
            });
    });
};
};





//     export const logInWithPopup = () => {
//         return dispatch => {
//             //...
//             dispatch(logInStart());

//         }).catch ((error) => {
//             // Handle Errors here.
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             // The email of the user's account used.
//             var email = error.email;
//             // The firebase.auth.AuthCredential type that was used.
//             var credential = error.credential;
//             console.log(error);
//             dispatch(logInFail());
//             // ...
//         });
//     };
// };

export const logOut = () => {
    return dispatch => {
        //...

        FireConnnect.auth().signOut().then(() => {
            // Sign-out successful.
            dispatch(authLogout());
            console.log("Logut")
        }).catch(function (error) {
            // An error happened.
            console.log(error)
        });
    };
};

export const saveTheme = (theme) => {
    return dispatch => {
        //...
        dispatch(savingThemeStart());
        let user = FireConnnect.auth().currentUser;
        FireConnnect.database().ref('users/' + user.uid).update({
            theme: theme,
        })
            // if you forget to use arrowfunction here you cant use the keyword "this"
            .then(response => {
                console.log(response)
                dispatch(savingThemeSuccess());
                dispatch(getTheme());
            })
            .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
                dispatch(savingThemeFail());
                // ...
            });
    };
};

export const getTheme = (email, password) => {
    return dispatch => {

                let user = FireConnnect.auth().currentUser;
                let ref = FireConnnect.database().ref('users/' + user.uid)
                ref.once("value")
                    .then(response => {
                        console.log(response.val())
                        dispatch(logInSuccess(response.val()));
                        console.log('getheme')
                    })
                        // ...
};
};