import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// redux
import { connect } from 'react-redux';
import { editUserProfile } from '../redux/actions/userActions';
// materialui
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// icons
import EditIcon from '@material-ui/icons/Edit';


const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    button: {
        float: 'right'
    }
});

class EditUserProfile extends Component {
    state = {
        bio: '',
        location: '',
        website: '',
        open: false
        // by default, the dialog is closed
    };
    mapUserDataToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            location: credentials.location ? credentials.location : '',
            website: credentials.website ? credentials.website : ''
            // if we have a bio, we show the bio, otherwise it's undefined
        });
        // we want user's current info to popluate when they open the dialog so user can edit it
    };
    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDataToState(this.props.credentials);
    };
    handleClose = () => {
        this.setState({ open: false });
    }
    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDataToState(credentials);
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    handleSubmit = () => {
        const userData = {
            bio: this.state.bio,
            location: this.state.location,
            website: this.state.website,
        };
        this.props.editUserProfile(userData);
        this.handleClose();
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="edit profile" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle> edit your profile </DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio" type="text" label="bio"
                                multiline rows="3" placeholder="a short bio about yourself" className={classes.textField} value={this.state.bio}
                                onChange={this.handleChange} fullWidth />
                            {/* multiline makes it a text area! */}
                            <TextField
                                name="location" type="text" label="location"
                                placeholder="where are you?" className={classes.textField} value={this.state.location}
                                onChange={this.handleChange} fullWidth />
                            <TextField
                                name="website" type="text" label="website"
                                placeholder="your personal/professional website" className={classes.textField} value={this.state.website}
                                onChange={this.handleChange} fullWidth />
                        </form>
                        {/* our form won't have a submit action because the dialog will take care of that for us */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} color="primary">
                            save
                    </Button>
                        <Button onClick={this.handleClose} color="secondary">
                            cancel
                    </Button>
                    </DialogActions>
                    {/* the buttons at the bottom of the dialog */}
                </Dialog>
            </Fragment>
        )
    }
}

EditUserProfile.propTypes = {
    editUserProfile: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserProfile })(withStyles(styles)(EditUserProfile));
