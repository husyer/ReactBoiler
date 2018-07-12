import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../store/utility';

const initialState = {
    users: null,
    loading: true,
    snackMessage: {
        open: false,
        message: ''
    }
};

const getTodoListStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const getTodoListSuccess = (state, action) => {
    return updateObject(state, {
        todoList: action.todoList,
        loading: false,
    });
};


const getTodoListFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const getTodoListDoneStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const getTodoListDoneSuccess = (state, action) => {
    return updateObject(state, {
        todoListDone: action.todoList,
        loading: false,
    });
};
const getTodoListDoneFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};


const addTodoItemStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const addTodoItemSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        snackMessage: {
            open:true,
            message:'Task successfully created'
        }
    });

};

const addTodoItemFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        snackMessage:'none',
    });
};

const editTodoItemStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const editTodoItemSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        snackMessage: {
            open:true,
            message:'Task successfully edited'
        }
    });

};

const editTodoItemFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        snackMessage:'none',
    });
};



const deleteTodoItemStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const deleteTodoItemSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        snackMessage: {
            open:true,
            message: 'Task successfully deleted'
        }
    });

};

const deleteTodoItemFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        snackMessage:'none',
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
        case actionTypes.GETTODOLIST_START: return getTodoListStart(state, action);
        case actionTypes.GETTODOLIST_SUCCESS: return getTodoListSuccess(state, action);
        case actionTypes.GETTODOLIST_FAIL: return getTodoListFail(state, action);

        case actionTypes.GETTODOLISTDONE_START: return getTodoListDoneStart(state, action);
        case actionTypes.GETTODOLISTDONE_SUCCESS: return getTodoListDoneSuccess(state, action);
        case actionTypes.GETTODOLISTDONE_FAIL: return getTodoListDoneFail(state, action);

        case actionTypes.ADDTODOITEM_START: return addTodoItemStart(state, action);
        case actionTypes.ADDTODOITEM_SUCCESS: return addTodoItemSuccess(state, action);
        case actionTypes.ADDTODOITEM_FAIL: return addTodoItemFail(state, action);

        case actionTypes.EDITTODOITEM_START: return editTodoItemStart(state, action);
        case actionTypes.EDITTODOITEM_SUCCESS: return editTodoItemSuccess(state, action);
        case actionTypes.EDITTODOITEM_FAIL: return editTodoItemFail(state, action);

        
        case actionTypes.DELETETODOITEM_START: return deleteTodoItemStart(state, action);
        case actionTypes.DELETETODOITEM_SUCCESS: return deleteTodoItemSuccess(state, action);
        case actionTypes.DELETETODOITEM_FAIL: return deleteTodoItemFail(state, action);

        case actionTypes.CLOSEMESSAGE: return closeMessage(state, action);

        default:
            return state;
    }
}

    export default reducer;