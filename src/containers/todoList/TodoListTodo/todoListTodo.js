import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment';

import TodoItem from './todoListTodoItem/todoListItem'
import EditTaskDialogs from '../../../components/UI/Forms/editTaskDialogs'
import ZoomInDialog from '../../../components/UI/Dialogs/zoomInDialog'


class todoGrid extends React.Component {
  state = {
    todoItemId: '',
    openEditDialog: false,
    openZoomDialog: false,
    TodoListArray: [],
    searchText: ""
  }

  editTask = (todoItem) => {
    this.props.editTask(todoItem)
    this.setState({ openEditDialog: false });
  }


  openEditDialog = (todoItemId) => {
    this.setState({
      todoItemId: todoItemId
    },
      this.setState({ openEditDialog: true, })
    );
  }

  closeEditDialog = () => {
    this.setState({ openEditDialog: false });
  };

  openZoomDialog = (todoItemId) => {
    this.setState({
      todoItemId: todoItemId
    },
      this.setState({ openZoomDialog: true, })
    );
  }

  closeZoomDialog = () => {
    this.setState({ openZoomDialog: false });
  };

  handleSearchInput = (e) => {
    this.setState({ searchText: e.target.value.toLowerCase()});
  }


  render() {



    let maList = (
      <p>{this.props.emptyMessage}</p>
    )


    if (this.props.todoList) {

      const filteredList = Object.keys(this.props.todoList).map(key => {
        return this.props.todoList[key] = {
          ...this.props.todoList[key],
          taskId: key
        }
      })
        .filter(key => key.title.toLowerCase().includes(this.state.searchText))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key.taskId]: { ...this.props.todoList[key.taskId] }
          }
        }, {});

      maList = (
        <Grid container justify="center" spacing={24}>
          <TextField
            fullWidth
            label="Search by title"
            onChange={this.handleSearchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <EditTaskDialogs
            closeEditDialog={this.closeDialog}
            open={this.state.openEditDialog}
            closeEditDialog={this.closeEditDialog}
            editTask={this.editTask}
            todoItem={this.props.todoList[this.state.todoItemId]}
            todoItemId={this.state.todoItemId}
          />

          <ZoomInDialog
            closeZoomDialog={this.closeZoomDialog}
            open={this.state.openZoomDialog}
            todoItem={this.props.todoList[this.state.todoItemId]}
            todoItemId={this.state.todoItemId}
          />

          {Object.keys(filteredList).map(todoItem =>
            <Grid key={todoItem} item >
              <TodoItem
                ButtonText={this.props.ButtonText}
                keys={todoItem}

                editTask={this.props.editTask}
                deleteTask={this.props.deleteTask}
                setAsDone={this.props.setAsDone}
                openEditDialog={this.openEditDialog}
                openZoomDialog={this.openZoomDialog}
                todoItemId={todoItem}
                {...this.props.todoList[todoItem]}
              />
            </Grid>
          )

          }


        </Grid>
      )
    }
    return (
      <div>
        {maList}
      </div>
    );
  }
}


export default todoGrid;