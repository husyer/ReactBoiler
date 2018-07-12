import Button from '@material-ui/core/Button';
import Textfields from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { CircularProgress } from '@material-ui/core/CircularProgress';

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/index'

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from '@material-ui/core/Dialog';

const styles = {
  content: {
    paddingTop: 40,
  }

}

export class registerForm extends Component {

  state = {
    login: "",
    password: "",
    open: true
  }


  passwordChanged = (event) => {
    this.setState({ password: event.target.value });
  }

  loginChanged = (event) => {
    this.setState({ login: event.target.value });
  }

  Login = () => {
    this.props.onLogin(this.state.login, this.state.password);
  }



  render() {

    let  dialogContent = (
      <div>
        <Textfields
          id="login-field"
          label="Login"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Your Login"
          helperText=""
          margin="normal"
          fullWidth={true}
          onChange={this.loginChanged}
        />
        <Textfields
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          fullWidth={true}
          onChange={this.passwordChanged}
        />
      </div>

    )
    if (this.props.isLoading) {
      dialogContent = (
        <CircularProgress size={50} />
      )
    }

  
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.registerCancel}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Register
          </DialogTitle>

          <DialogContent>
            <div>
              {dialogContent}
            </div>
          </DialogContent>

          <DialogActions>
            <Button raised color="accent" onClick={this.props.registerCancel}>
              Cancel
          </Button>
            <Button raised color="primary" onClick={() => this.props.RegisterAttempt(this.state.login, this.state.password)} color="primary" autoFocus>
              Register
          </Button>
          </DialogActions>

        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.authReducer.isLogged,
    isLoading: state.authReducer.loading
  };
}


export default connect(mapStateToProps, null)(registerForm);
