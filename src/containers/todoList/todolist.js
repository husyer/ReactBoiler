import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import * as actionTypes from './store/actions/todoListActions'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done'
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import TodoListTodo from './TodoListTodo/todoListTodo'
import AddTaskDialogs from '../../components/UI/Forms/AddTaskDialogs'

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    appBar: {
        // width: `calc(100% - ${drawerWidth}px)`,
        zIndex: '1',
    },
    tabsRoot: {
        width: '100%',
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

class TodoList extends React.Component {
    state = {
        value: 0,
    };

    componentWillMount() {
        this.props.getTodoList(this.props.match.params.projectId, this.props.user.userId);
        this.props.getTodoListDone(this.props.match.params.projectId, this.props.user.userId);
    }

    handleChangeTabs = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    saveNewTodoItem = (todoItem) => {
        this.props.onAddTodoItem(todoItem, this.props.user.userId);
    };

    setAsDoneTodoItem = (todoItem) => {
        this.props.editTask(this.props.match.params.projectId, todoItem, this.props.user.userId)
    };

    editTask = (todoItem) => {
        this.props.editTask(this.props.match.params.projectId, todoItem, this.props.user.userId)
    };


    deleteTask = (todoItem) => {
        this.props.deleteTask(this.props.match.params.projectId, todoItem, this.props.user.userId);
    };

    hideMessage = () => {
        this.props.onCloseMessage();
    }

    render() {
        const { classes, theme } = this.props;

        let todoList
        if (this.props.isLoading) {
            todoList = (
                <CircularProgress size={50} />
            )
        } else {
            todoList = (
                <Grid container className={classes.root}>
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
                    <Typography variant='display1' component="div" style={{ padding: 8 * 3 ,width:'100%'}}>
                        {this.props.match.params.projectName}
                    </Typography>

                    <AppBar className={classes.appBar} position="static" color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChangeTabs}
                            centered
                        >
                            <Tab label="Task to do" />
                            <Tab label="Task Done" />
                        </Tabs>
                    </AppBar>

                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                        className={classes.tabsRoot}
                    >
                        <TabContainer hidden={this.state.value == 1} dir={theme.direction}>
                            <div hidden={this.state.value == 1}>
                                <AddTaskDialogs projectId={this.props.match.params.projectId} onSavingTodoItem={this.saveNewTodoItem} />
                                <TodoListTodo
                                    emptyMessage="Add some tasks to do."
                                    ButtonText='Done'
                                    deleteTask={this.deleteTask}
                                    editTask={this.editTask}
                                    setAsDone={this.setAsDoneTodoItem}
                                    todoList={this.props.todoList} />
                            </div>
                        </TabContainer>

                        <TabContainer hidden={this.state.value == 0} dir={theme.direction}>
                            <div hidden={this.state.value == 0}>
                                <TodoListTodo emptyMessage="You don't have any task set as done." editTask={this.editTask} isVisible={this.state.value} ButtonText='Set as Undone' deleteTask={this.deleteTask} setAsDone={this.setAsDoneTodoItem} todoList={this.props.todoListDone} />
                            </div>
                        </TabContainer>

                    </SwipeableViews>
                </Grid>
            )
        }

        return (
            <Fragment>
                {todoList}
            </Fragment>

        );
    }
}

TodoList.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        todoList: state.todoListReducer.todoList,
        todoListDone: state.todoListReducer.todoListDone,
        user: state.authReducer.user,
        isLoading: state.todoListReducer.loading,
        snackMessageOpen: state.todoListReducer.snackMessage.open,
        message: state.todoListReducer.snackMessage.message
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddTodoItem: (todoItem, uid) => dispatch(actionTypes.addTodoItem(todoItem, uid)),
        getTodoList: (projectId, uid) => dispatch(actionTypes.getTodoList(projectId, uid)),
        getTodoListDone: (projectId, uid) => dispatch(actionTypes.getTodoListDone(projectId, uid)),
        editTask: (projectId, todoItemId, uid) => dispatch(actionTypes.editTask(projectId, todoItemId, uid)),
        deleteTask: (projectId, todoItemId, uid) => dispatch(actionTypes.deleteTask(projectId, todoItemId, uid)),
        onCloseMessage: () => dispatch(actionTypes.closeMessage()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles, { withTheme: true })(TodoList)));
