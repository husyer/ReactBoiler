import * as actionTypes from './actionTypes'
import FireConnnect from '../../../../FireConnnect'


export const getProjectsStart = () => {
    return {
        type: actionTypes.GETPROJECTS_START
    };
};

export const getProjectsSuccess = (projectsList) => {
    return {
        type: actionTypes.GETPROJECTS_SUCCESS,
        projectsList: projectsList
    };
};


export const getProjectsFail = (error) => {
    return {
        type: actionTypes.GETPROJECTS_FAIL,
        error: error
    };
};



export const addProjectStart = () => {
    return {
        type: actionTypes.ADDPROJECT_START
    };
};

export const addProjectSuccess = (usersData) => {
    return {
        type: actionTypes.ADDPROJECT_SUCCESS,
        usersData: usersData
    };
};

export const addProjectFail = (error) => {
    return {
        type: actionTypes.ADDPROJECT_FAIL,
        error: error
    };
};

export const editProjectStart = () => {
    return {
        type: actionTypes.EDITPROJECT_START
    };
};

export const editProjectSuccess = (usersData) => {
    return {
        type: actionTypes.EDITPROJECT_SUCCESS,
        usersData: usersData
    };
};

export const editProjectFail = (error) => {
    return {
        type: actionTypes.EDITPROJECT_FAIL,
        error: error
    };
};



export const deleteProjectStart = () => {
    return {
        type: actionTypes.DELETEPROJECT_START
    };
};

export const deleteProjectSuccess = (usersData) => {
    return {
        type: actionTypes.DELETEPROJECT_SUCCESS,
        usersData: usersData
    };
};

export const deleteProjectFail = (error) => {
    return {
        type: actionTypes.DELETEPROJECT_FAIL,
        error: error
    };
};

export const closingMessage = (error) => {
    return {
        type: actionTypes.CLOSEMESSAGE,
        error: error
    };
};



export const getProjectsList = (uid) => {
    return dispatch => {
        //...
        dispatch(getProjectsStart());
        let ref = FireConnnect.database().ref('/Projects/' + uid)
        ref.once("value")
            .then(response => {
                dispatch(getProjectsSuccess(response.val()));
            })
            .catch(error => {
                dispatch(getProjectsFail(error));
            });
    };
};

export const addProject = (project, uid) => {
    return dispatch => {
        //...
        dispatch(addProjectStart());

        var postData = {
            // author: project.username,
            title: project.title,
            uid: uid,

        };

        // Get a key for a new Post.

        var newProjectKey = FireConnnect.database().ref('/Projects/' + uid + '/').push().key;

        var updates = {};
        updates['/Projects/' + uid + '/' + newProjectKey] = postData;

        FireConnnect.database().ref().update(updates).then(response => {
            dispatch(addProjectSuccess(response));
            dispatch(getProjectsList(uid));
        })
            .catch(error => {
                dispatch(addProjectFail());
                // ...
            });
    };
};

export const editProject = (project, uid) => {
    return dispatch => {
        //...
        dispatch(editProjectStart());

        var postData = {
            title: project.title,
        };

        var updates = {};
        updates['/Projects/' + uid + '/' + project.id] = postData;

        FireConnnect.database().ref().update(updates).then(response => {
            dispatch(editProjectSuccess(response));
            dispatch(getProjectsList(uid));
        })
            .catch(error => {
                dispatch(editProjectFail());
            });
    };
};


export const deleteProject = (projectId, uid) => {
    return dispatch => {
        //...
        dispatch(deleteProjectStart());


        var updates = {};
        updates['/Projects/' + uid + '/' + projectId] = null;
        updates['/Todos/' + uid + '/' + projectId] = null;


        FireConnnect.database().ref().update(updates).then(response => {

            dispatch(deleteProjectSuccess(response));
            dispatch(getProjectsList(uid));

        })
            .catch(error => {
                // Handle Errors here.
                dispatch(deleteProjectFail());
                // ...
            });
    };
};

export const closeMessage = (projectId, uid) => {
    return dispatch => {
        //...
        dispatch(closingMessage());
    };

};
