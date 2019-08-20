import React from 'react';
import PropTypes from 'prop-types';
import blankProfilePic from '../images/blank-profile-picture.png';
// materialUI
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
// icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

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
    handle: {
        height: 20,
        backgroundColor: '#D44500',
        width: 100,
        // margin: '10, auto, 7px, auto'
        marginLeft: 532
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: '50%',
        marginBottom: 10,
        marginLeft: 300
    },
    halfLine: {
        height: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: '25%',
        marginBottom: 10,
        marginLeft: 450
    }
});

const ProfileSkeleton = (props) => {
    const { classes } = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={blankProfilePic} component="img" alt="profile" className="profile-image" />
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle} />
                    <hr />
                    <div className={classes.fullLine} />
                    <div className={classes.halfLine} />
                    <hr />
                    <LocationOn color="primary" /> <span> location </span>
                    <hr />
                    <LinkIcon color="primary" /> <span> website </span>
                    <hr />
                    <CalendarToday color="primary" /> <span> date joined </span>
                </div>
            </div>
        </Paper>
    )
};

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton)
