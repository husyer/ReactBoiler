import './App.css';

import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Layout from './hoc/layout/Layout.1'
import FireConnnect from './FireConnnect'

import UserList from './containers/UserList/UserList'
import TodoList from './containers/todoList/todolist'
import ProjectList from './containers/projectList/ProjectList'
import home from './components/home/homePage'

import * as actionTypes from './store/actions/index'

const styles = {
  root: {
    width: '100%',
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    width: '100%',
    height: '100%',
  },
}


//decode token Admin
function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
};

class Routes extends Component {



  state = {
    theme: 'light',
    checkedA: 'true',
    checkedB: 'false',
    role: 'none',
    loading: true,

  }



  componentWillMount() {


    // Listen for Auth Changes
    FireConnnect.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.onReLogin(user);
        FireConnnect.auth().currentUser.getIdToken()
          .then((idToken) => {
            // Parse the ID token.
            const payload = JSON.parse(b64DecodeUnicode(idToken.split('.')[1]));
            // Confirm the user is an Admin.
            if (!!payload['admin']) {
              this.setState({ role: 'admin' })
            }
            this.setState({ loading: false })
          })
      } else {
        this.setState({ role: 'none' })
        this.props.history.push('/home')
        this.setState({ loading: false })
      }
    });



  }
  componentDidMount() {

    if (this.props.isLogged && this.props.theme !== this.state.theme) {
      this.setState({ theme: this.props.theme })
    }
  }

  OnSwitchTheme = (themep) => {

    if (this.props.isLogged) {
      if (this.props.theme !== themep) {
        this.setState({ theme: themep })
      }
    }

    else {
      if (this.state.theme !== themep) {
        this.setState({ theme: themep })
      }
    }

  }

  render() {

    let theme = createMuiTheme({
      palette: {
        type: this.state.theme, // Switching the dark mode on is a single property value change.
      },
    });



    // if (this.props.isLogged) {
    //   theme = createMuiTheme({
    //     palette: {
    //       type: this.props.theme, // Switching the dark mode on is a single property value change.
    //     },
    //   });
    // }



    let routes = (
      <Switch>
        <Route path="/home" component={home} />>
    </Switch>
    )

    if (this.props.isLogged) {
      routes = (
        <Switch>
          <Route path="/ProjectList" render={() => <ProjectList />} />>
          <Route path="/TodoList/:projectId/:projectName" render={() => <TodoList />} />>

        </Switch>
      )
    }

    if (this.props.isLogged && this.state.role === 'admin') {
      routes = (
        <Switch>
          <Route path="/UsersList" component={UserList} />>
          <Route path="/ProjectList" render={() => <ProjectList />} />>
          <Route path="/TodoList/:projectId/:projectName" render={() => <TodoList />} />>
          <Redirect to='/UsersList' />
        </Switch>
      )
    }

    return (
      <div style={styles.appFrame} className="App">
        <MuiThemeProvider theme={theme}>
          <Layout layoutLoading={this.state.loading} isLogged={this.props.isLogged} role={this.state.role} userName={this.props.userName} switchTheme={this.OnSwitchTheme}>
            {routes}
          </Layout>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.authReducer.isLogged,
    userName: state.authReducer.userName,
    user: state.authReducer.user,
    theme: state.authReducer.theme,

  };
}

const mapDispatchToProps = dispatch => {
  return {
    onReLogin: (user) => dispatch(actionTypes.reLogin(user)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
