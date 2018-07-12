import * as actionTypes from './actionTypes'
import FireConnnect from '../../../../FireConnnect'


export const getTodoListStart = () => {
    return {
        type: actionTypes.GETTODOLIST_START
    };
};

export const getTodoListSuccess = (todoList) => {
    return {
        type: actionTypes.GETTODOLIST_SUCCESS,
        todoList: todoList
    };
};

export const getTodoListFail = (error) => {
    return {
        type: actionTypes.GETTODOLIST_FAIL,
        error: error
    };
};



export const getTodoListDoneStart = () => {
    return {
        type: actionTypes.GETTODOLISTDONE_START
    };
};

export const getTodoListDoneSuccess = (todoList) => {
    return {
        type: actionTypes.GETTODOLISTDONE_SUCCESS,
        todoList: todoList
    };
};

export const getTodoListDoneFail = (error) => {
    return {
        type: actionTypes.GETTODOLISTDONE_FAIL,
        error: error
    };
};





export const addTodoItemStart = () => {
    return {
        type: actionTypes.ADDTODOITEM_START
    };
};

export const addTodoItemSuccess = (usersData) => {
    return {
        type: actionTypes.ADDTODOITEM_SUCCESS,
        usersData: usersData
    };
};

export const addTodoItemFail = (error) => {
    return {
        type: actionTypes.ADDTODOITEM_FAIL,
        error: error
    };
};

export const editTodoItemStart = () => {
    return {
        type: actionTypes.EDITTODOITEM_START
    };
};

export const editTodoItemSuccess = (usersData) => {
    return {
        type: actionTypes.EDITTODOITEM_SUCCESS,
        usersData: usersData
    };
};

export const editTodoItemFail = (error) => {
    return {
        type: actionTypes.EDITTODOITEM_FAIL,
        error: error
    };
};

export const deleteTodoItemStart = () => {
    return {
        type: actionTypes.DELETETODOITEM_START
    };
};

export const deleteTodoItemSuccess = (usersData) => {
    return {
        type: actionTypes.DELETETODOITEM_SUCCESS,
        usersData: usersData
    };
};

export const deleteTodoItemFail = (error) => {
    return {
        type: actionTypes.DELETETODOITEM_FAIL,
        error: error
    };
};

export const closingMessage = (error) => {
    return {
        type: actionTypes.CLOSEMESSAGE,
        error: error
    };
};


//...Recuper la liste des taches a faire
export const getTodoList = (projectId,uid) => {
    return dispatch => {
        //...
        dispatch(getTodoListStart());
        let ref = FireConnnect.database().ref('/Todos/' + uid +'/'+ projectId + '/').orderByChild('isDone').equalTo(false)
        ref.once("value")
            .then(response => {
                dispatch(getTodoListSuccess(response.val()));
            })
            .catch(error => {
                dispatch(getTodoListFail(error));
            });
    };
};

//...Recuper la liste des taches termines
export const getTodoListDone = (projectId,uid) => {
    return dispatch => {
        //...
        dispatch(getTodoListDoneStart());
        let ref = FireConnnect.database().ref('/Todos/' + uid +'/'+ projectId + '/').orderByChild('isDone').equalTo(true)
        ref.once("value")
            .then(response => {
                dispatch(getTodoListDoneSuccess(response.val()));
            })
            .catch(error => {
                dispatch(getTodoListDoneFail(error));
            });
    };
};

export const addTodoItem = (todoItem,uid) => {
    return dispatch => {
        //...
        dispatch(addTodoItemStart());

        var postData = {
            // author: project.username,
            title: todoItem.title,
            date: Date.now(),
            description: todoItem.description,
            isDone: false
        };
        ;

        //add a key for the task with projectId as Parent (equivalent a une cle primaire)
        var newTaskKey = FireConnnect.database().ref().child('/Todos/' + uid +'/'+ todoItem.projectId).push().key;

        var updates = {};

        //then update
        updates['/Todos/' + uid +'/'+ todoItem.projectId + '/' + newTaskKey] = postData;

        FireConnnect.database().ref().update(updates).then(response => {
            dispatch(addTodoItemSuccess(response));
            dispatch(getTodoList(todoItem.projectId,uid));
            dispatch(getTodoListDone(todoItem.projectId,uid));
        })
            .catch(error => {
                // Handle Errors here.
                dispatch(addTodoItemFail());
            });
    };
};

export const editTask = (projectId, todoItem, uid) => {
    return dispatch => {

        var postData = {
            title: todoItem.title,
            date: Date.now(),
            description: todoItem.description,
            isDone: todoItem.isDone
        };
        //...
        dispatch(editTodoItemStart());
        var updates = {};

        //then update
        updates['/Todos/' + uid +'/'+ projectId + '/' + todoItem.id] = postData;

        FireConnnect.database().ref().update(updates).then(response => {
            dispatch(editTodoItemSuccess(response));
            dispatch(getTodoList(projectId,uid));
            dispatch(getTodoListDone(projectId,uid));
        })
            .catch(error => {
                // Handle Errors here.
                dispatch(editTodoItemFail());
            });
    };
};

export const deleteTask = (projectId, todoItemID, uid) => {
    return dispatch => {

        //...
        dispatch(deleteTodoItemStart());
        var updates = {};

        //then update
        updates['/Todos/' + uid +'/'+ projectId + '/' + todoItemID]  = null;

        FireConnnect.database().ref().update(updates).then(response => {
            dispatch(deleteTodoItemSuccess(response));
            dispatch(getTodoList(projectId,uid));
            dispatch(getTodoListDone(projectId,uid));
        })
            .catch(error => {
                // Handle Errors here.
                dispatch(deleteTodoItemFail());
            });
    };
};

export const closeMessage = (projectId, uid) => {
    return dispatch => {
        //...
        dispatch(closingMessage());
    };

};
