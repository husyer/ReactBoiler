import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ZoomIn from '@material-ui/icons/ZoomIn';


import styled from 'styled-components'
import Dotdotdot from 'react-dotdotdot'

const Content = styled.div`
    display: inline-block;
    position: relative;
    margin-top:20px;
`

const CardTitle = styled.div`
    color:white;
    flex: none;
    padding: 15px;
    ${'' /* background: #2C5364;
    box-shadow: 3px 4px 10px 0px #2C5364; */}

    background: #000000;
    box-shadow: 3px 4px 10px 0px #000000;
    
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 300;
    line-height: 1.5em;
    border-radius: 3px;
    position: absolute;
	margin: auto;
	width: 80%;
    left: 0;
    right: 0;
    margin-top: -20px;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
    opacity:0.7;
`
const D3 = styled.div`
margin-top:20px;
`
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    card: {
        width: 270,
        height: 270,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    Colored: {
        backgroundColor: theme.palette.background.default,
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
    },
    cardContent: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',

    },
    avatar: {
        backgroundColor: red[500],


    },
    cardFooter: {
        padding: 0,
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        position: 'absolute',
        bottom: 0,
        backgroundColor: theme.palette.background.default,

    },
});




class TodoItem extends React.Component {
    state = {
        openZoomDialog: false,
        expanded: false,
        todoItem: {
            title: this.props.title,
            date: this.props.date,
            description: this.props.description,
            isDone: this.props.isDone,
            id: this.props.todoItemId
        }
    };

    handleSetTaskStatus = () => {
        this.setState({ todoItem: { ...this.state.todoItem, isDone: !this.props.isDone, } }, () => { this.props.setAsDone(this.state.todoItem) });
    }

    openEditTaskDialog = () => {
        this.props.openEditDialog(this.state.todoItem.id)
    }

    openZoomTaskDialog = () => {
        this.props.openZoomDialog(this.state.todoItem.id)
    }

    render() {
        const { classes } = this.props;
        let date
        if (this.props.date) {
            date = new Date(this.props.date).toDateString();
        }
        return (
            <Content>
                <Card className={classes.card}>
                    <CardTitle>
                        {this.props.title}
                    </CardTitle>
                    <D3>
                        <CardHeader
                            action={
                                <div>
                                    <IconButton onClick={this.openZoomTaskDialog}>
                                        <ZoomIn />
                                    </IconButton>
                                    <IconButton onClick={this.openEditTaskDialog}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => this.props.deleteTask(this.props.todoItemId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            }
                            subheader={date}
                        />
                        <CardContent >
                            <Dotdotdot clamp={3}>
                            {this.props.description}
                            </Dotdotdot>
                        </CardContent>

                        <Grid className={classes.cardFooter} container alignItems="center" justify="center" spacing={0}>
                            <Grid item>
                                <Button className={classes.button} onClick={this.handleSetTaskStatus} variant="outlined">
                                    {this.props.ButtonText}
                                    <DoneIcon className={classes.rightIcon} />

                                </Button>
                            </Grid>

                        </Grid>
                    </D3>
                </Card>
            </Content>
        );
    }
}

TodoItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoItem);