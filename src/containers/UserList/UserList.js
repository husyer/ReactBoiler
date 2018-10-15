import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress  from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as actionTypes from '../UserList/store/actions/userList'

import ButtonDialog from '../../components/Forms/DeleteWithDialog';



export class userList extends Component {

  state = {
    open: false,
  }

  componentDidMount() {
    this.props.onGetUsers();

  }

  test = () => {
    this.setState({ userDeleted: false })
  }

  DeleteUser = (userId) => {
    this.props.onDeleteUser(userId);
    this.props.onGetUsers();
  }

  handleClose = () => {
    this.props.onMessage();
  };

  render() {


    let montableau = (<TableRow />);

    if (!this.props.isLoading) {
      montableau = (
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell numeric>uid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(this.props.users).map(user =>
              <TableRow hover key={this.props.users[user].uid}>
                <TableCell>{this.props.users[user].email}</TableCell>
                <TableCell numeric>{this.props.users[user].uid}</TableCell>
                <TableCell numeric>
                  {/* <Button onClick={() => this.props.onDeleteUser(this.props.users[user].uid)}> */}
                  <ButtonDialog
                    Title="Supprimer l'utilisateur"
                    BodyText="Voulez vous vraiment supprimer cet utilisateur ?"
                    clickAgree={() => this.DeleteUser(this.props.users[user].uid, this.props.users[user].email)}
                  >
                    <DeleteIcon />
                  </ButtonDialog>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      )
    } else {
      montableau = (
        <CircularProgress size={50} />
      )
    }


    return (

      <Paper>
     <Snackbar
          open={this.props.snackMessageOpen}
          onClose={this.handleClose}
          autoHideDuration={6000}
          message={<span id="message-id">{this.props.message}</span>}
        />
            {/* {snackBar} */}
            {montableau}

      </Paper>
    )
        }
}

const mapStateToProps = state => {
  return {
    users: state.getUser.users,
    isLoading: state.getUser.loading,
    snackMessageOpen: state.getUser.snackMessage.open,
    message: state.getUser.snackMessage.message
  };
}

const mapDispatchToProps = dispatch => {
  return {
          onGetUsers: () => dispatch(actionTypes.getUsers()),
    onDeleteUser: (uid) => dispatch(actionTypes.deleteUser(uid)),
    onMessage: () => dispatch(actionTypes.resetMessage())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(userList);