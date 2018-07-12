import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../store/utility';

const initialState = {
    users: null,
    loading: false,
    snackMessage: {
        open: false,
        message: ''
    }
};

const getProjectsStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const getProjectsSuccess = (state, action) => {
    return updateObject(state, {
        projectsList: action.projectsList,
        loading: false,
    });
};

const getProjectsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const addProjectStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const addProjectSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        snackMessage: {
            open: true,
            message: 'Project successfully created'
        }
    });

};

const addProjectFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        snackMessage: 'none',
    });
};


const editProjectStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
        snackMessage: {
            open: false,
            message: ''
        }
    });
};

const editProjectSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        snackMessage: {
            open: true,
            message: 'Project successfully edited'
        }
    });

};

const editProjectFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        snackMessage: {
            open: false,
            message: 'Project successfully edited'
        }
    });
};



const deleteProjectStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const deleteProjectSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        snackMessage: {
            open: true,
            message: 'Project successfully deleted'
        }
    });
};

const deleteProjectFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        snackMessage: 'Error on deleting project',
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


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GETPROJECTS_START: return getProjectsStart(state, action);
        case actionTypes.GETPROJECTS_SUCCESS: return getProjectsSuccess(state, action);
        case actionTypes.GETPROJECTS_FAIL: return getProjectsFail(state, action);

        case actionTypes.ADDPROJECT_START: return addProjectStart(state, action);
        case actionTypes.ADDPROJECT_SUCCESS: return addProjectSuccess(state, action);
        case actionTypes.ADDPROJECT_FAIL: return addProjectFail(state, action);

        case actionTypes.EDITPROJECT_START: return editProjectStart(state, action);
        case actionTypes.EDITPROJECT_SUCCESS: return editProjectSuccess(state, action);
        case actionTypes.EDITPROJECT_FAIL: return editProjectFail(state, action);

        case actionTypes.DELETEPROJECT_START: return deleteProjectStart(state, action);
        case actionTypes.DELETEPROJECT_SUCCESS: return deleteProjectSuccess(state, action);
        case actionTypes.DELETEPROJECT_FAIL: return deleteProjectFail(state, action);

        case actionTypes.CLOSEMESSAGE: return closeMessage(state, action);

        default:
            return state;
    }
}

export default reducer;