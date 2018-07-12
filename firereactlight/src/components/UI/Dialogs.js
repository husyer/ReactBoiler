import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from '@material-ui/core/Dialog';

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

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDisagree= () => {
    this.setState({ open: false });
  };

  handleAgree= () => {
    this.props.clickAgree();
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Button  onClick={this.handleClickOpen}>{this.props.children}</Button>
        <Dialog
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
            <Button raised color="accent" onClick={this.handleClose}>
                Annuler
            </Button>
            <Button raised color="primary" onClick={this.handleAgree} color="primary" autoFocus>
                Accepter
            </Button>
          </DialogActions>
        </Dialog>
        
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);