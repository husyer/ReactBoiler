import Button from '@material-ui/core/Button';
import Textfields from '@material-ui/core/TextField'
import FireConnnect from '../FireConnnect'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions/index'

const styles = {
  content: {
    paddingTop:40,
  }

}

export class registerForm extends Component {

  state = {
    login: "",
    password: "",
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
    let myForm = ""
    if (!this.props.isLogged) {
      myForm = (
        <form>
          <Grid direction='column' alignItems='center' justify="center" container spacing={8}>
            <Grid item xs={8}>
              <Textfields
                id="login-field"
                label="Login"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Your Login"
                helperText=""
                margin="normal"
                fullWidth={false}
                onChange={this.loginChanged}
              />
            </Grid>
            <Grid item xs={8}>
              <Textfields
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                fullWidth={false}
                onChange={this.passwordChanged}
              />
            </Grid>
            <Grid item xs={8}>
              <Button onClick={this.Login} raised color="primary">
                Hello World

          </Button>
            </Grid>

          </Grid>
        </form>
      );
    }

    if (this.props.isLogged) {
      myForm = (<p>Tu Es LOGGUER</p>)
    }




    return (
      <Grid style={styles.content} justify="center" container spacing={0}>
        <Grid item xs={6}>
          <Paper >
          <p>REGISTER</p>
            {myForm}
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.authReducer.isLogged
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actionTypes.register(email, password)),
    onLoginWithPopUp: () => dispatch(actionTypes.logInWithPopup())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(registerForm);

