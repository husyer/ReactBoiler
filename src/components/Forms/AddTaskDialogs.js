import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Formsy from 'formsy-react';
import CannotBeEmpty from '../FormsValidations/inputwithValidations'


const isEmptyError = "This field cannot be empty"

class ResponsiveDialog extends React.Component {
    state = {
        open: false,
        isValid: false,
        titleErrorMessage: "",
        titleError: false,
        descriptionErrorMessage: "",
        descriptionError: false,
        todoItem: {
            projectId: this.props.projectId,
            isDone: false
        },
    };



    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChangeTitle = (e) => {
        this.setState({ todoItem: { ...this.state.todoItem, title: e.target.value } },
            () => {
                if (this.state.todoItem.title.trim() == "") {
                    this.setState({
                        titleError: true,
                        titleMessageError: isEmptyError
                    })
                } else {
                    this.setState({
                        titleMessageError: '',
                        titleError: false,
                    })
                }
            }
        )
    }

    handleChangeDesc = (e) => {
        this.setState({ todoItem: { ...this.state.todoItem, description: e.target.value } })
    }


    handleSave = () => {
        this.props.onSavingTodoItem(this.state.todoItem)
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
            <div style={{ marginBottom: 10 }} >
                <Button variant='outlined' onClick={this.handleClickOpen}>Add a task</Button>
                <Dialog
                    fullWidth
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <Formsy onValidSubmit={this.handleSave} onValid={this.enableButton} onInvalid={this.disableButton}>

                        <DialogTitle id="responsive-dialog-title">Add a task</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                               A task list need a name and a description.
            </DialogContentText>

                            <CannotBeEmpty
                                name='description'
                                validationError={isEmptyError}
                                validations="isWhiteSpace"
                                TextFieldId='title'
                                TextFieldLabel='Title'
                                type="text"
                                required
                                handleChange={this.handleChangeTitle}
                            />

                            <CannotBeEmpty
                                multiline
                                name='description'
                                validationError={isEmptyError}
                                validations="isWhiteSpace"
                                TextFieldId='description'
                                TextFieldLabel='Description'
                                required
                                handleChange={this.handleChangeDesc}
                            />


                        </DialogContent>
                        <DialogActions>
                            <Button variant='outlined' onClick={this.handleClose} >
                                Cancel
                            </Button>
                            <Button variant='outlined' disabled={!this.state.isValid} type="submit" autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </Formsy>
                </Dialog>

            </div>
        );
    }
}

ResponsiveDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);
