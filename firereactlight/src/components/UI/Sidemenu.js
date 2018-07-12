import React from 'react';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import Collapse from '@material-ui/core/Collapse';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Link from 'react-router-dom'

import FireConnnect from '../../FireConnnect'

class SideMenu extends React.Component {

  state = { open: true };




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

    // Authenticated Menu
    if (this.props.isLogged) {
      adminHead = (

        <Typography type="title" color="inherit">
          {this.props.userName}
        </Typography>
      )
      adminMenu = (
        <List>
          <Link to="/Home">
            <ListItem button >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText inset primary="Home" />
            </ListItem>
          </Link>
        </List>
      )

    }

    // Admin Menu
    if (this.props.role == 'admin' && this.props.isLogged) {
      adminHead = (

        <Typography type="title" color="inherit">
          {this.props.userName}
        </Typography>
      )
      adminMenu = (
        <List>
          <Link to="/UsersList">
            <ListItem button >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText inset primary="UsersList" />
            </ListItem>
          </Link>
        </List>
      )

    }

        // Anonymous Menu
    if (!this.props.isLogged) {
      adminHead = (
        <Typography type="title" color="inherit">
          Bienvenue
        </Typography>)

      anonymousMenu = (
        <List>

          <Link to="/Home">
            <ListItem button >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText inset primary="Home" />
            </ListItem>
          </Link>
        </List>
      )
    }

    return (
      <div>
        {/* <AppBar position="static" color="default">
          <Toolbar>
            {adminHead}
          </Toolbar>
        </AppBar> */}
        <List>

          {/* {adminMenu}
          {anonymousMenu} */}

          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText inset primary="Theme" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse component="li" in={this.state.open} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItem button onClick={() => {
                this.props.switchTheme('dark')
              }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary="dark"
                />
              </ListItem>

            </List>

            <List disablePadding>
              <ListItem button onClick={() => {
                this.props.switchTheme('light')
              }}>

                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText

                  inset
                  primary="Light"
                />
              </ListItem>

            </List>



          </Collapse>

        </List>
      </div>
    );

  }
}



export default SideMenu;

