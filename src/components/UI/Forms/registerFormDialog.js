import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core/CircularProgress';

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import InputWithValidations from '../../FormsValidations/inputwithValidations'
import Formsy from 'formsy-react';

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
    const { fullScreen } = this.props;

    let dialogContent = (
      <div>
        <InputWithValidations
          name='login'
          validationError='This field cannnot be empty'
          validations="isEmail"
          TextFieldId='login'
          TextFieldLabel='login'
          type="login"
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
      </div>

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
              <Button onClick={this.props.registerCancel}>
                Cancel
          </Button>
              <Button color="primary" onClick={() => this.props.RegisterAttempt(this.state.login, this.state.password)} autoFocus>
                Register
          </Button>
            </DialogActions>

          </Dialog>
        </Formsy>
      </div>
    )
  }
}


export default withMobileDialog()(registerForm);
