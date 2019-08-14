import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ToolButton from './ToolButton';
// redux
import { connect } from 'react-redux';
import { shareThought, clearErrors } from '../redux/actions/dataActions';
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
        float: 'right',
        marginTop: 20
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '4%'
    }
};

class ShareThought extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({
                errors: nextProps.ui.errors
            });
        }
        if (!nextProps.ui.errors && !nextProps.ui.loading) {
            this.setState({ body: '', open: false, errors: {} });
        };
    };
    handleOpen = () => {
        this.setState({ open: true })
    };
    handleClose = () => {
        this.props.clearErrors();
        // this will clear the errors out so they won't be stored in the state when we close the dialog
        this.setState({ open: false, errors: {} });
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.shareThought({ body: this.state.body });
        // this.handleClose();
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
                    <DialogTitle> share your thoughts! </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name="body" type="text"
                                label="click here to type:" multiline rows="2" placeholder="what's on your mind?"
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
    clearErrors: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    ui: state.ui
});

export default connect(mapStateToProps, { shareThought, clearErrors })(withStyles(styles)(ShareThought));