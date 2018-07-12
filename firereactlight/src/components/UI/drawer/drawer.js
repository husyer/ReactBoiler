import React, { Component } from 'react'
import Sidemenu from '../Sidemenu'
import DrawerMUI from '@material-ui/core/Drawer';

export default class Drawer extends Component {
    render() {
        return (
            <DrawerMUI anchor="left" open={this.props.open} onClose={this.props.toggleDrawer}>
                    <Sidemenu isLogged={this.props.isLogged} userName={this.props.userName} switchTheme={this.props.switchTheme} />
            </DrawerMUI>
        )
    }
}
