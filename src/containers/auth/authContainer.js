import CircularProgress from '@material-ui/core/CircularProgress'

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/index'

import RegisterForm from '../../components/UI/Forms/registerForm'
import LoginForm from '../../components/UI/Forms/loginFormFlat'
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

const styles = theme => ({

});
export class AuthContainer extends Component {

    state = {
        login: "",
        password: "",
        open: true,
        registerFormValid: false,
        value: 0,
    }
    handleChangeTabs = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    Loggout = () => {
        this.props.onLogout();
    }

    submitRegister = (login, pass) => {
        this.props.onRegister(login, pass);
    }
    
    submitLogin = (login, pass) => {
        this.props.onLogin(login, pass);
    }

    showDialog = () => {
        this.setState({
            showDialog: true
        })
    }

    setRef = (formRef) => {
        if (formRef !== this.state.formRef) {
            this.setState({
                formRef: formRef
            })
        }

    }

    validTrue = () => {
        this.setState({
            registerFormValid: true
        })
    }

    validFalse = () => {
        this.setState({
            registerFormValid: false
        })
    }
    componentDidMount() {
        this.setState({
            value: 0
        })
    }

    render() {
        const { classes, theme } = this.props;
        return (
            <Fragment>
                <Paper>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChangeTabs}
                            centered
                            fullWidth
                        >
                            <Tab label="Login" />
                            <Tab label="Register" />
                        </Tabs>
                    </AppBar>

                    <SwipeableViews
                        axis={'x-reverse'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                        className={classes.tabsRoot}
                    >
                        <TabContainer hidden={this.state.value == 1} dir={theme.direction}>
                        <div hidden={this.state.value == 1}>
                            <LoginForm DialogForm={false} withButton submitLogin={this.submitLogin} />
                            </div>
                        </TabContainer>

                        <TabContainer hidden={this.state.value == 0} isHidden={this.state.value == 0} dir={theme.direction}>
                           <div hidden={this.state.value == 0}>
                            <RegisterForm DialogForm={false} withButton submitRegister={this.submitRegister} />
                            </div>
                        </TabContainer>

                    </SwipeableViews>
                </Paper>
            </Fragment>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actionTypes.logIn(email, password)),
        onRegister: (email, password) => dispatch(actionTypes.register(email, password)),
        onLogout: () => dispatch(actionTypes.logOut())
    };
}

export default connect(null, mapDispatchToProps)(withStyles(null, { withTheme: true })(AuthContainer));