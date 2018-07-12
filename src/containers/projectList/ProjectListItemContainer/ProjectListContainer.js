import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmationDialog from '../../../components/UI/Forms/DeleteWithDialog'
import EditProjectDialog from '../../../components/UI/Forms/editProjectDialog'

import {
  Link
} from 'react-router-dom'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: '100%',
    width: '100%',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class ProjectContainer extends React.Component {
  state = {
    projectEditedID: '',
    openEditDialog: false,
    spacing: '16',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  deleteProject = (project) => {
    this.props.onDeleteProject(project);
  };

  editProject = (project) => {
    this.props.editProject(project)
    this.setState({ openEditDialog: false });
  }

  openEditDialog = (projectId) => {
    this.setState({
      projectEditedID: projectId
    },
      this.setState({ openEditDialog: true, })
    );
  }

  closeEditDialog = () => {
    this.setState({ openEditDialog: false });
  };



  render() {
    const { classes } = this.props;

    let maList = (
      <p style={{padding:'10px 0 10px 0'}}>Start by adding a task list after that click on it to start adding tasks in it.</p>
    )

    if (this.props.projectsList) {
      maList = (

        <List>

          {Object.keys(this.props.projectsList).map(projectId =>

            <ListItem
              key={projectId}
              role={undefined}
              dense
              button
              className={classes.listItem}
              component={Link}
              to={"/todoList/" + projectId +'/'+this.props.projectsList[projectId].title}
            >
              <ListItemText primary={this.props.projectsList[projectId].title} />

              <ListItemSecondaryAction>

                <IconButton onClick={() => this.openEditDialog(projectId)}>
                  <EditIcon />
                </IconButton>

                <ConfirmationDialog
                  Title="Supprimer le projet ?"
                  BodyText="Voulez vous vraiment supprimer ce projet? ?"
                  clickAgree={() => this.deleteProject(projectId)}
                >
                  <DeleteIcon />
                </ConfirmationDialog>
              </ListItemSecondaryAction>

            </ListItem>

          )}
          <EditProjectDialog
            editProject={this.editProject}
            closeEditDialog={this.closeEditDialog}
            open={this.state.openEditDialog}
            projectId={this.state.projectEditedID}
            {...this.props.projectsList[this.state.projectEditedID]}
          />

        </List>

      )
    }


    return (
      <div>

        {maList}
      </div>
    );
  }
}


export default withStyles(styles)(ProjectContainer);