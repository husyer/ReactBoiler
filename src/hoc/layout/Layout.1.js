import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import styled from "styled-components";
import { connect } from 'react-redux'
import classnames from 'classnames';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import DoneIcon from '@material-ui/icons/Done'
import MenuIcon from '@material-ui/icons/Menu';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as actionTypes from '../../store/actions/auth'

import Sidemenu from '../../components/UI/Menu/Sidemenu'
import AuthMenu from '../../components/UI/Menu/appBarMenu'
import mountain from '../../static/images/Montain.jpeg'


const drawerWidth = 270;

const styles = theme => ({

  appFrame: {

    boxSizing: 'border-box',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },

  drawerPaper: {
    width: drawerWidth,
    zIndex: 1,
    border: '1px solid rgba(0, 0, 0, 0.5)',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },

  appBar: {
    // width: `calc(100% - ${drawerWidth}px)`,
    position: 'absolute',
    marginLeft: drawerWidth,
    backgroundColor: 'transparent',
    boxShadow: 'none',

    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    width: `calc(100% - ${drawerWidth}px)`,
    overflow: 'auto',
  },

  rightIcon: {
    marginLeft: '4px',
  },
  toolbar: theme.mixins.toolbar,

  alignItems: {
    justifyContent: 'space-between'
  },

  menuDroit: {
    position: 'relative',
    left: '30px',
  },

  flex: {
    flex: 1,
  },

  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

const StyledPaper = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: block;
    position: absolute;
    background-size: cover;
    background-position: center center;
    background-image: url(${mountain});
    &:after{
      top: 0;
    left: 0;
      width: 100%;
    height: 100%;
    z-index: 3;
    content: "";
    display: block;
    opacity: .6;
    position: absolute;
    background: #000;
}
`;


class Layout extends React.Component {

  state = {
    openDrawer: false,
    mobileOpen: false,
  };


  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  hideMessage = () => {
    this.props.onCloseMessage();
  }


  render() {

    const { classes, theme } = this.props;

    const appBarClasses = classnames({
      toolbar: classes.toolbar,
      itemDisplay: classes.alignItems
    });

    return (
      <div className={classes.appFrame} >

        <Snackbar
          open={this.props.snackMessageOpen}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
          onClose={this.hideMessage}
          autoHideDuration={2000}
          message={
            <span className={classes.message} id="message-id">
              <DoneIcon />
              {this.props.message}
            </span>}
        />

        <AppBar className={classes.appBar} position="absolute" >
          <Toolbar className={classes.alignItems}>

            <Hidden mdUp implementation="css">
              <IconButton onClick={this.handleDrawerToggle} aria-label="Menu">
                <MenuIcon />
              </IconButton>
            </Hidden>

            <Hidden smDown implementation="css">
              <Typography className={classes.flex} variant="display1">
                Task list manager
            </Typography>
            </Hidden>

            <AuthMenu className={classes.menuDroit} isLogged={this.props.isLogged} />
          </Toolbar>
        </AppBar>

        <Hidden smDown implementation="css">
          <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" anchor="left" open>
            <StyledPaper>
              <Sidemenu role={this.props.role} isLogged={this.props.isLogged} userName={this.props.userName} switchTheme={this.props.switchTheme} />
            </StyledPaper>
          </Drawer>
        </Hidden>

        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor='left'
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <StyledPaper>
              <Sidemenu role={this.props.role} isLogged={this.props.isLogged} userName={this.props.userName} switchTheme={this.props.switchTheme} />
            </StyledPaper>
          </Drawer>
        </Hidden>
        <Grid container className={classes.content}>
          <Grid item xs={12}>
            {/* Div Class toolbar un hack pour positionne le contenu sous la appBar vois css */}
            <div className={classes.toolbar} />
            {this.props.isLoading || this.props.isLoadingP ? (<CircularProgress size={50} />) : this.props.children}

          </Grid>
        </Grid>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    isLoading: state.authReducer.loading,
    snackMessageOpen: state.authReducer.snackMessage.open,
    message: state.authReducer.snackMessage.message
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseMessage: () => dispatch(actionTypes.closeMessage()),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Layout));


