import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../../../store/actions/auth'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import InputWithValidations from '../../FormsValidations/inputwithValidations'
import Formsy from 'formsy-react';

export class LoginForm extends Component {

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
    const { fullScreen } = this.props;

    let dialogContent = (
      <Fragment>
        <InputWithValidations
          name='Login'
          validationError='This field cannnot be empty'
          validations="isWhiteSpace"
          TextFieldId='login'
          TextFieldLabel='Login'
          type="text"
          required
          handleChange={this.loginChanged}
        />

        <InputWithValidations
          name='password'
          validationError='This field cannnot be empty'
          validations="isWhiteSpace"
          TextFieldId='password'
          TextFieldLabel='password'
          type="password"
          required
          handleChange={this.passwordChanged}
        />
      </Fragment>

    )
    if (this.props.isLoading) {
      dialogContent = (
        <CircularProgress size={50} />
      )
    }


    return (
      <div>
        <Formsy
          ref={(e) => this.maRef = e}
          onValidSubmit={this.submitRegister}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
        >
          <Dialog
            fullWidth
            fullScreen={fullScreen}
            open={this.props.open}
            onClose={this.props.loginCancel}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              Log In
          </DialogTitle>

            <DialogContent>
              <div>
                {dialogContent}
              </div>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={this.props.loginCancel}>
                Annuler
          </Button>
              <Button variant="outlined" onClick={() => this.props.LoginAttempt(this.state.login, this.state.password)} autoFocus>
                Log In
          </Button>
            </DialogActions>

          </Dialog>
        </Formsy>
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

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actionTypes.logIn(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(LoginForm));

