import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import IconButton from '@material-ui/core/IconButton';

class ResponsiveDialog extends React.Component {
  state = {
    open: false,
  };
  //propsList
  // Title
  // BodyText
  // clickAgree()
  //ButtonText

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };

  handleDisagree = () => {
    this.setState({ open: false });
  };

  handleAgree = () => {
    this.props.clickAgree();
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <React.Fragment>
        <IconButton onClick={this.handleClickOpen} >
          {this.props.children}
        </IconButton>
        <Dialog
          fullWidth
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title"> {this.props.Title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.BodyText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' onClick={this.handleClickClose}>
              Annuler
            </Button>
            <Button variant='outlined' onClick={this.handleAgree} autoFocus>
              Accepter
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);