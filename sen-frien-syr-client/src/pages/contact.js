import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../images/Logo2.png';
// materialUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative'
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
        }
    }
});

const contact = (props) => {
    const { classes } = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={Logo} alt="city icon" className="profile-image" />
                </div>
                <hr />
                <div className="profile-details">
                    <Typography variant="h2" color="primary">
                        contact
                    </Typography>
                    <hr />
                    <Typography variant="body1" color="textPrimary">
                        please send all comments, questions, and concerns to:
                    </Typography>
                    <hr />
                    <Typography variant="h5" color="primary">
                        contact@sensoryfriendlysyracuse.com
                    </Typography>
                    <hr />
                </div>
            </div>
        </Paper>
    )
};



contact.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(contact);
