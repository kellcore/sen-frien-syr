import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ToolButton from '../utilities/ToolButton';
// redux
import { connect } from 'react-redux';
import { deleteThought } from '../../redux/actions/dataActions';
// materialUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
// icons
import DeleteIcon from '@material-ui/icons/DeleteOutline';



const styles = {
    deleteButton: {
        position: 'absolute',
        left: '75%',
        bottom: '67%'
    }
};

class DeleteThought extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    deleteThought = () => {
        this.props.deleteThought(this.props.thoughtId);
        // this is a function that calls the action this.props.deleteThought
        this.setState({ open: false });
    };
    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     this.handleClose();
    // };
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <ToolButton tip="delete thought" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteIcon color="secondary" />
                </ToolButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    {/* <form onSubmit={this.handleSubmit}> */}
                    <DialogTitle>
                        are you sure you want to delete this thought?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.deleteThought} color="primary"> delete </Button>
                        <Button onClick={this.handleClose} color="secondary"> cancel </Button>
                    </DialogActions>
                    {/* <type="submit" /form> */}
                </Dialog>
            </Fragment>
        )
    }
}

DeleteThought.propTypes = {
    deleteThought: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    thoughtId: PropTypes.string.isRequired
}

export default connect(null, { deleteThought })(withStyles(styles)(DeleteThought));

// we pass null here instead of mapStateToProps because we don't need anything from the state since we're deleting the thought
