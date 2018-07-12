import React, { Component } from 'react'


//material Ui imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu, { MenuItem, MenuList } from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components'

import AuthMenu from '../Menu/appBarMenu'

const styles = {
    menuDroit: {
        position: 'relative',
        left: '30px',
    },
    flex: {
        flex: 1,
    },
    appBar:{
        height:'64px',
    }
}

const ReponsiveTitle = styled.span`
  @media (max-width: 500px) {
    display:none;
  }
`;

export default class appBar extends Component {

    render() {
        return (
            <AppBar style={styles.appBar} position="absolute" color="default">
                <Toolbar>
                    <IconButton onClick={this.props.openDrawer} aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography style={styles.flex} variant="display1" color="inherit">
                        <ReponsiveTitle>
                            Welcome to The Huster's Protofolio
                        </ReponsiveTitle>
                        </Typography>
                    <AuthMenu style={styles.menuDroit} isLogged={this.props.isLogged} />
                </Toolbar>
            </AppBar>
        )
    }
}
