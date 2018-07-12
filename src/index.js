import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

//middleware of redux and co;pose for devtool
import {createStore, applyMiddleware, compose,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'


import authReducer from './store/reducers/authreducer'
import userReducer from './containers/UserList/store/reducer/getUsersReducer'
import projectReducer from './containers/projectList/store/reducer/projectListReducer'
import todoListReducer from './containers/todoList/store/reducer/todoListReducer'

const rootReducer = combineReducers({
  authReducer: authReducer,
  getUser:userReducer,
  projectReducer: projectReducer,
  todoListReducer: todoListReducer
});

// config thunk pour async code 
//+ debuger reduxtool pour le dev only
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

//Build
// const store = createStore(rootReducer,compose(
//   applyMiddleware(thunk)
// ));


ReactDOM.render((
  //Inject Store here store={store}
  <Provider store={store}>
    <BrowserRouter >
            <Routes />
    </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();






