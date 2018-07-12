import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { MenuItem, MenuList } from '@material-ui/core/Menu';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from '@material-ui/core/utils/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import LoginForm from '../../../containers/auth/loginForm'
import RegisterForm from '../../../containers/auth/registerForm'

import { connect } from 'react-redux'
import * as actionTypes from '../../../store/actions/index'

const styles = {
  root: {
    display: 'flex',
  },
  popperClose: {
    pointerEvents: 'none',
  },
};

class MenuListComposition extends React.Component {
  state = {
    openMenu: false,
    showLogInForm: false,
    showRegisterForm: false,
  };

  handleOpenMenu = () => {
    this.setState({ openMenu: true });
  };

  handleCloseMenu = () => {
    this.setState({ openMenu: false });
  };

  handleClickLogInMenu = () => {
    this.setState(
      {
        openMenu: false,
        showLogInForm: true,
      });
  };

  handleLoginCancel = () => {
    this.setState({ showLogInForm: false });
  };

  
  LogginIn = (login,pass) => {
    this.props.onLogin(login, pass);
    this.setState({ showLogInForm: false });
  }

  Loggout = () => {
    this.props.onLogout();
  }

  Registering = (login,pass) => {
    this.props.onRegister(login, pass);
    this.setState({ showRegisterForm: false });
  }

  handleClickRegisterMenu = () => {
    this.setState(
      {
        openMenu: false,
        showRegisterForm: true,
      });
  };

  handleRegisterCancel = () => {
    this.setState({ showRegisterForm: false });
  };

  


  render() {
    const { openMenu } = this.state;
    let myloginForm
    let AppBarMenu




    if (this.props.isLogged) {
      AppBarMenu = (
        <div>


          <Manager>
            <Target>
              <IconButton
                aria-owns={this.state.openMenu ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleOpenMenu}
              >
                <AccountCircle />
              </IconButton>
            </Target>
            <Popper
              placement="bottom-start"
              eventsEnabled={openMenu}
            >
              <ClickAwayListener onClickAway={this.handleCloseMenu}>
                <Grow in={openMenu} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                  <Paper>
                    <MenuList role="menu">
                      <MenuItem >Profile</MenuItem>
                      <MenuItem onClick={this.Loggout} >Logout</MenuItem>
                    </MenuList>
                  </Paper>
                </Grow>
              </ClickAwayListener>
            </Popper>
          </Manager>
        </div>
      )
    } else {

      AppBarMenu = (
        <div>
          <LoginForm LoginAttempt={this.LogginIn} open={this.state.showLogInForm} loginCancel={this.handleLoginCancel} />
          <RegisterForm RegisterAttempt={this.Registering} open={this.state.showRegisterForm} registerCancel={this.handleRegisterCancel} />

          <Manager>
            <Target>
              <Button
                aria-owns={this.state.openMenu ? 'menu-list' : null}
                aria-haspopup="true"
                onClick={this.handleOpenMenu}
              >
                Log In
            </Button>
            </Target>
            <Popper
              placement="bottom-start"
              eventsEnabled={openMenu}
            >
              <ClickAwayListener onClickAway={this.handleCloseMenu}>
                <Grow in={openMenu} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                  <Paper>
                    <MenuList role="menu">
                      <MenuItem onClick={this.handleClickLogInMenu}>Log In</MenuItem>
                      <MenuItem onClick={this.handleClickRegisterMenu}>Register</MenuItem>
                    </MenuList>
                  </Paper>
                </Grow>
              </ClickAwayListener>
            </Popper>
          </Manager>
        </div>
      )
    }
    return (
      <div>
        {AppBarMenu}
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actionTypes.logIn(email, password)),
    onRegister: (email, password) => dispatch(actionTypes.register(email, password)),
    onLogout: () => dispatch(actionTypes.logOut())
  };
}

export default connect(null, mapDispatchToProps)(MenuListComposition);