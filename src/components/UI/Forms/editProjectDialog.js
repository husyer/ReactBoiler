import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import InputWithvalidations from '../../FormsValidations/inputwithValidations'

import Formsy from 'formsy-react';
class EditProjectDialog extends React.Component {
    state = {
        project: {
            title: this.props.title,
            id: this.props.projectId
        },
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.title !== this.props.title) {
            this.setState({
                project: {
                    title: nextProps.title,
                    id: nextProps.projectId
                }
            });
        }
    }

    handleChange = (e) => {
        this.setState({ project: { ...this.state.project, title: e.target.value } })
    }

    handleClickCancel = () => {
        this.props.closeEditDialog();
        this.setState({ project: { ...this.state.project, title: this.props.title } });
    }

    editProject = () => {
        this.props.editProject(this.state.project)
    }

    render() {
        const { fullScreen } = this.props;

        return (
            <div>

                <Dialog
                    fullWidth
                    fullScreen={fullScreen}
                    open={this.props.open}
                    onClose={this.handleClickCancel}
                    aria-labelledby="responsive-dialog-title"
                >
                    <Formsy onValidSubmit={this.handleEditTask} onValid={this.enableButton} onInvalid={this.disableButton}>

                        <DialogTitle id="responsive-dialog-title">Ajouter une tache</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Edit project.
                            </DialogContentText>

                            <InputWithvalidations
                                name='description'
                                validationError='This field cannnot be empty'
                                validations="isWhiteSpace"
                                TextFieldId='title'
                                TextFieldLabel='Title'
                                type="text"
                                value={this.state.project.title}
                                required
                                handleChange={this.handleChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button variant='outlined' onClick={this.handleClickCancel} >
                                Cancel
            </Button>
                            <Button variant='outlined' onClick={this.editProject} autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </Formsy>
                </Dialog>
            </div>
        );
    }
}

EditProjectDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(EditProjectDialog);
