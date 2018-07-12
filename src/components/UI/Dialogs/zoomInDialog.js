import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DialogContentText from '@material-ui/core/DialogContentText';

class ZoomInTaskDialog extends React.Component {

    state = {
        todoItem: {
            title: '',
            date: '',
            description: '',
            isDone: '',
            id: ''
        },
    };



componentWillReceiveProps(nextProps){
    if(nextProps.todoItem !== this.props.todoItem || nextProps.todoItemId !== this.props.todoItemId){
        this.setState({
            todoItem:{
                ...nextProps.todoItem,
                id:nextProps.todoItemId
            }
    });
    }
}

    render() {
        const { fullScreen } = this.props;

        return (
            <div>
                <Dialog
                fullWidth
                    fullScreen={fullScreen}
                    open={this.props.open}
                    onClose={this.props.closeZoomDialog}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                    <Typography variant='display1'>
                    {this.state.todoItem.title}
                    </Typography>
                    </DialogTitle>
                    
                    <DialogContent>
                    <DialogContentText>
                           {this.state.todoItem.description}
            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeZoomDialog} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

ZoomInTaskDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ZoomInTaskDialog);
