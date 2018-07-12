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

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const rootReducer = combineReducers({
  auth: authReducer,
  getUser:userReducer
});
//config thunk pour async code
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));



ReactDOM.render((
  //Inject Store here store={store}
  <Provider store={store}>
    <BrowserRouter >
            <Routes />
    </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();






