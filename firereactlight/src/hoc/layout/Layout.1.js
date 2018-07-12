import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


import AppBar from '../../components/UI/appBar/appBar'
import Drawer from '../../components/UI/drawer/drawer'




const drawerWidth = 0;

let appBarHeight = 0;

const styles = {

  appFrame: {
    boxSizing: 'border-box',
    paddingLeft:drawerWidth,
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },

  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },

  appBar: {
    position: 'absolute',
    width: `calc(100% - ${drawerWidth}px)`,
  },
  appBar2: {
    width: 240,
  },
  content: {
    width: '100%',
    height: '100%',
    paddingTop: 64,
    boxSizing: 'border-box',
    paddingLeft: drawerWidth,
  },

  rightIcon: {
    marginLeft: '4px',
  },
}




class Layout extends React.Component {

  state = {
    openDrawer: false,
  };

  toggleDrawer = () => {
    this.setState({
      openDrawer: false,
    });
  };

  openDrawer = () => {
    this.setState({
      openDrawer: true,
    });
  };
  

  render() {



    return (
      <root > 
        <Drawer drawerWidth={styles.drawerPaper}  open={this.state.openDrawer} toggleDrawer={this.toggleDrawer} userName={this.props.userName} isLogged={this.props.isLogged} switchTheme={this.props.switchTheme}/>
        <AppBar appBarWidth={styles.appBar} openDrawer={this.openDrawer} isLogged={this.props.isLogged}/>


        <Paper style={styles.content}>
          {this.props.children}
        </Paper>
      </root>
    );
  }
}


export default Layout;
