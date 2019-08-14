import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ToolButton from './ToolButton';
// redux
import { connect } from 'react-redux';
import { shareThought } from '../redux/actions/dataActions';
// materialui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
// icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
    // card: {
    //     position: 'relative',
    //     display: 'flex',
    //     marginBottom: 20,
    //     // maxWidth: 400,
    //     // textAlign: 'center'
    // },
    // media: {
    //     // minWidth: 200,
    //     height: 200,
    //     width: 200
    // },
    // content: {
    //     padding: 25,
    //     objectFit: 'cover'
    // },
    submitButton: {
        position: 'relative',
        marginBottom: '20'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
};

class ShareThought extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };
    handleOpen = () => {
        this.setState({ open: true })
    };
    handleClose = () => {
        this.setState({ open: false })
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.shareThought({ body: this.state.body });
        this.handleClose();
    };
    render() {
        const { errors } = this.state;
        // getting our errors from the state if there are any
        const { classes, ui: { loading } } = this.props;
        return (
            <Fragment>
                <ToolButton onClick={this.handleOpen} tip="share a thought">
                    <AddIcon />
                </ToolButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <ToolButton tip="close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon color="secondary" />
                    </ToolButton>
                    <DialogTitle> write and share your thought! </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name="body" type="text"
                                label="thought goes here..." multiline rows="3" placeholder="share your thoughts with everyone!"
                                error={errors.body ? true : false}
                                helperText={errors.body} className={classes.textField} onChange={this.handleChange} fullWidth />
                            {/* helperText will display any errors to the user -> if it's undefined, we won't have any text */}
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                enter
                               {loading && (<CircularProgress size={30} className={classes.progressSpinner} />)}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
};

ShareThought.propTypes = {
    shareThought: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    ui: state.ui
});

export default connect(mapStateToProps, { shareThought })(withStyles(styles)(ShareThought));