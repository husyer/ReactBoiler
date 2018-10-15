import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import CannotBeEmpty from '../FormsValidations/inputwithValidations'
import Formsy from 'formsy-react';
import InputWithvalidations from '../FormsValidations/inputwithValidations'
const isEmptyError = "This field cannot be empty"

class EditTaskDialog extends React.Component {

    state = {
        isValid: false,
        todoItem: {
            title: '',
            date: '',
            description: '',
            isDone: '',
            id: ''
        },
    };



    componentWillReceiveProps(nextProps) {
        if (nextProps.todoItem !== this.props.todoItem || nextProps.todoItemId !== this.props.todoItemId) {
            this.setState({
                todoItem: {
                    ...nextProps.todoItem,
                    id: nextProps.todoItemId
                }
            });
        }
    }


    handleChangeTitle = (e) => {
        this.setState({ todoItem: { ...this.state.todoItem, title: e.target.value } })
    }

    handleChangeDesc = (e) => {
        this.setState({ todoItem: { ...this.state.todoItem, description: e.target.value } })
    }


    handleEditTask = () => {
        this.props.editTask(this.state.todoItem)
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

                <Dialog
                    fullWidth
                    fullScreen={fullScreen}
                    open={this.props.open}
                    onClose={this.props.closeEditDialog}
                    aria-labelledby="responsive-dialog-title"

                >
                    <Formsy onValidSubmit={this.handleEditTask} onValid={this.enableButton} onInvalid={this.disableButton}>
                        <DialogTitle id="responsive-dialog-title">Edit Task</DialogTitle>
                        <DialogContent style={{ minWidth: '400px' }}>
                            <DialogContentText>
                                Edit Task.
            </DialogContentText>

                            <InputWithvalidations
                                name='description'
                                validationError={isEmptyError}
                                validations="isWhiteSpace"
                                TextFieldId='title'
                                TextFieldLabel='Title'
                                value={this.state.todoItem.title}
                                type="text"
                                required
                                handleChange={this.handleChangeTitle}
                            />

                            <InputWithvalidations
                                name='description'
                                validationError={isEmptyError}
                                validations="isWhiteSpace"
                                TextFieldId='description'
                                TextFieldLabel='Description'
                                value={this.state.todoItem.description}
                                type="text"
                                required
                                multiline
                                handleChange={this.handleChangeDesc}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button variant='outlined' onClick={this.props.closeEditDialog} >
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

EditTaskDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(EditTaskDialog);
