import React, { Fragment } from 'react';
import { Paper, withStyles } from '@material-ui/core';
import { connect } from 'react-redux'
import * as actionTypes from './store/actions/projectList'

import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done'

import ProjectListItemContainer from './ProjectListItemContainer/ProjectListContainer'
import AddProjectDialog from '../../components/UI/Forms/addProjectDialog'


const styles = theme => ({
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

class ProjectList extends React.Component {
    state = {
        value: 0,
    };

    componentWillMount() {
        this.props.onGetProjects(this.props.user.userId);
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    saveNewProject = (project) => {
        this.props.onAddProject(project, this.props.user.userId);
    };

    deleteProject = (projectId) => {
        this.props.onDeleteProject(projectId, this.props.user.userId);
    };

    editProject = (Project) => {
        this.props.onEditProject(Project, this.props.user.userId);
    };

    hideMessage = () => {
        this.props.onCloseMessage();
    }



    render() {
        const { classes, theme } = this.props;
        let projectList
        if (this.props.isLoading) {
            projectList = (
                <CircularProgress size={50} />
            )
        }
        else {
            projectList = (
                <Fragment >
                    <Snackbar
                        open={this.props.snackMessageOpen}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                        onClose={this.hideMessage}
                        autoHideDuration={2000}
                        message={
                            <span className={classes.message} id="message-id">
                                <DoneIcon />
                                {this.props.message}
                            </span>}
                    />
                    <Paper style={{padding:'10px 0 0 0'}} >
                        <AddProjectDialog  user={this.props.user} onSavingProject={this.saveNewProject} />
                        <ProjectListItemContainer editProject={this.editProject} onDeleteProject={this.deleteProject} projectsList={this.props.projectsList} />
                    </Paper>
                </Fragment>
            )
        }

        return (
            <Fragment>
                {projectList}
            </Fragment>
        );
    }
}



const mapStateToProps = state => {
    return {
        projectsList: state.projectReducer.projectsList,
        user: state.authReducer.user,
        isLoading: state.projectReducer.loading,
        snackMessageOpen: state.projectReducer.snackMessage.open,
        message: state.projectReducer.snackMessage.message
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetProjects: (uid) => dispatch(actionTypes.getProjectsList(uid)),
        onAddProject: (project, uid) => dispatch(actionTypes.addProject(project, uid)),
        onDeleteProject: (projectId, uid) => dispatch(actionTypes.deleteProject(projectId, uid)),
        onEditProject: (project, uid) => dispatch(actionTypes.editProject(project, uid)),
        onCloseMessage: () => dispatch(actionTypes.closeMessage()),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProjectList));

