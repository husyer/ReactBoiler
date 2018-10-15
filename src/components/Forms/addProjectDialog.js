import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import InputWithValidations from '../FormsValidations/inputwithValidations'
import Formsy from 'formsy-react';

class AddprojectDialog extends React.Component {
    state = {
        open: false,
        project: {
            title: ""
        },
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (e) => {
        this.setState({
            project: { title: e.target.value },
        });
    }

    handleSave = () => {
        this.props.onSavingProject(this.state.project)
        this.setState({ open: false });
    }

    enableButton = () => {
        this.setState({ isValid: true });
    }

    disableButton = () => {
        this.setState({ isValid: false });
    }

    render() {
        const { fullScreen } = this.props;

        return (
            <div>
                <Button variant='outlined' onClick={this.handleClickOpen}>Add a new task list</Button>
                <Dialog
                    fullWidth
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <Formsy onValidSubmit={this.handleSave} onValid={this.enableButton} onInvalid={this.disableButton}>
                        <DialogTitle id="responsive-dialog-title">Create a task list</DialogTitle>
                        <DialogContent>

                            <DialogContentText>
                                A task list only need a name.
                        </DialogContentText>

                            <InputWithValidations
                                name='description'
                                validationError='This field cannot be empty.'
                                validations="isWhiteSpace"
                                TextFieldId='title'
                                TextFieldLabel='Title'
                                type="text"
                                required
                                handleChange={this.handleChange}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button variant='outlined' onClick={this.handleClose} >
                                Cancel
                </Button>
                            <Button variant='outlined' type="submit" disabled={!this.state.isValid} autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </Formsy>
                </Dialog>
            </div>
        );
    }
}

AddprojectDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(AddprojectDialog);
