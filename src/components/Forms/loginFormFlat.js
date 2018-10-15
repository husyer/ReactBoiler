

import React, { Component, Fragment } from 'react';


import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Formsy from 'formsy-react';
import CannotBeEmpty from '../FormsValidations/inputwithValidations'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

export class registerForm extends Component {

  state = {
    email: "",
    password: "",
  }



  passwordChanged = (event) => {
    this.setState({ password: event.target.value });
  }

  emailChanged = (event) => {
    this.setState({ email: event.target.value });
  }

  submit = () => {
    this.props.submitLogin(this.state.email, this.state.password);
  }

  enableButton = () => {
    this.setState({ isValid: true });
    if (this.props.DialogForm) {
      this.props.validTrue();
    }

  }

  disableButton = () => {
    this.setState({ isValid: false });
    if (this.props.DialogForm) {
      this.props.validFalse();
    }
  }


  render() {
    const { classes, theme } = this.props;

    return (
      <Fragment>
        <Typography variant="display1" component="h3">
          Log in
        </Typography>
        <Formsy
          onValidSubmit={this.submit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
        >
          <CannotBeEmpty
            name='Login'
            validations={{
              isEmail: true,
              maxLength: 50,
              isWhiteSpace: true
            }}
            validationErrors={{
              isEmail: 'You have to type valid email',
              maxLength: 'You can not type in more than 50 characters',
              isWhiteSpace: 'Space not allowed'
            }}
            TextFieldId='Login'
            TextFieldLabel='Email'
            type="text"
            required
            handleChange={this.emailChanged}
          />

          <CannotBeEmpty
            name='password'
            validations={{
              maxLength: 50,
              minLength: 6,
              isWhiteSpace: true
            }}
            validationErrors={{
              maxLength: 'You can not type in more than 50 characters',
              minLength: 'Password should be at least 6 characters',
              isWhiteSpace: 'Space are not allowed'
            }}
            TextFieldId='passwordLoginFlat'
            TextFieldLabel='Password'
            type="password"
            required
            handleChange={this.passwordChanged}
          />

          {this.props.withButton ?
            (<Button type='submit' variant='outlined'>
              Log in
          </Button>) : ('')}
        </Formsy>
      </Fragment>
    )
  }
}



export default withStyles(styles)(registerForm);
