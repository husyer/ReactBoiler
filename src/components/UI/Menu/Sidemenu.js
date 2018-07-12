import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Face from '@material-ui/icons/Face';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListAlt from '@material-ui/icons/List'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import SendIcon from '@material-ui/icons/Send';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
import {
  NavLink
} from 'react-router-dom'




const styles = theme => ({

  appBar: {

    backgroundColor: 'transparent',
  },

  ColorWhite: {
    color: 'white',
  },
  toolbar: theme.mixins.toolbar,
  menuItem: {
    margin: '10px 15px 0',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    }
  },
  menuItemActive: {
    margin: '10px 15px 0',
    boxShadow: ' 0 12px 20px -10px rgba(0,188,212,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(0,188,212,.2)',
    backgroundColor: 'rgba(0, 172, 193, .6)',
    borderRadius: '3px',
    '&:hover': {
      backgroundColor: 'rgba(0, 172, 193, .6)',

    },
  },
  myToolBar: {
    zIndex: 5,
    flex: 1,
    '&:after':
    {
      right: 15,
      width: 'calc(100% - 30px)',
      bottom: 0,
      height: 1,
      content: "",
      position: 'absolute',
      backgroundColor: 'rgba(180, 180, 180, 0.3)',
    }
  },

  buttonTransformed: {
    color:'white'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },


})

class SideMenu extends React.Component {

  state = {
    open: true,
    active: false,
  };


  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  Logout = () => {
    this.props.onLogout();
  }


  render() {
    const { classes } = this.props;
    let adminHead
    let adminMenu
    let anonymousMenu


    // Admin Menu
    if (this.props.role === 'admin' && this.props.isLogged) {
      adminHead = (

        adminHead = (
          <Button  className={classes.buttonTransformed} >
          <Face className={classes.leftIcon} />
          {this.props.userName}
        </Button>
        )
      )
      adminMenu = (

        <MenuList>


          <MenuItem component={NavLink} className={this.props.classes.menuItem} activeClassName={this.props.classes.menuItemActive} to="/UsersList">
            <ListItemIcon classes={{ root: this.props.classes.ColorWhite }}>
              <SendIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.props.classes.ColorWhite }} inset primary="UsersList" />
          </MenuItem>

          <MenuItem component={NavLink} activeClassName={this.props.classes.menuItemActive} to="/ProjectList" className={classes.menuItem} button >
            <ListItemIcon classes={{ root: this.props.classes.ColorWhite }}>
              <ListAlt />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.props.classes.ColorWhite }} inset primary="TaskLists" />
          </MenuItem>


        </MenuList>
      )

    } else if (this.props.isLogged) {
      adminHead = (
        <Button  className={classes.buttonTransformed} >
        <Face className={classes.leftIcon} />
        {this.props.userName}
      </Button>
      )
    

      anonymousMenu = (
        <MenuList>

          <MenuItem component={NavLink} activeClassName={this.props.classes.menuItemActive} to="/ProjectList" className={classes.menuItem} button >
            <ListItemIcon classes={{ root: this.props.classes.ColorWhite }}>
              <ListAlt />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.props.classes.ColorWhite }} inset primary="TaskLists" />
          </MenuItem>

        </MenuList>
      )
    }

    // Anonymous Menu
    if (!this.props.isLogged) {
      adminHead = (
        <Button  className={classes.buttonTransformed} >
        <Face className={classes.leftIcon} />
        Welcome
      </Button>)

      anonymousMenu = (
        <MenuList>

          <MenuItem component={NavLink} activeClassName={this.props.classes.menuItemActive} to="/Home" className={classes.menuItem} button >
            <ListItemIcon classes={{ root: this.props.classes.ColorWhite }}>
              <SendIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.props.classes.ColorWhite }} inset primary="Home" />
          </MenuItem>

        </MenuList>
      )
    }

    return (
      <div>
        <AppBar className={classes.appBar} position="static">
          <Toolbar className={classes.myToolBar}>
            {adminHead}
          </Toolbar>

        </AppBar>

        <MenuList style={{ zIndex: '4' }}>

          {adminMenu}
          {anonymousMenu}

          <MenuItem className={classes.menuItem} button onClick={this.handleClick}>
            <ListItemIcon classes={{ root: this.props.classes.ColorWhite }}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.props.classes.ColorWhite }} inset primary="Theme" />
            {this.state.open ? 
              <ExpandLess classes={{ root: this.props.classes.ColorWhite }} /> 
            :
              <ExpandMore classes={{ root: this.props.classes.ColorWhite }}/>
            }
          </MenuItem>

          <Collapse component={MenuList} in={this.state.open} timeout="auto" unmountOnExit>

            <MenuList disablePadding>
              <MenuItem className={classes.menuItem} button onClick={() => {
                this.props.switchTheme('dark')
              }}>
                <ListItemIcon classes={{ root: this.props.classes.ColorWhite }}>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText
                  inset
                  classes={{ primary: this.props.classes.ColorWhite }}
                  primary="dark"
                />
              </MenuItem>

              <MenuItem className={classes.menuItem} button onClick={() => {
                this.props.switchTheme('light')
              }}>

                <ListItemIcon classes={{ root: this.props.classes.ColorWhite }}>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: this.props.classes.ColorWhite }}
                  inset
                  primary="Light"
                />
              </MenuItem>

            </MenuList>



          </Collapse>

        </MenuList>
      </div>
    );

  }
}



export default withStyles(styles)(SideMenu);

