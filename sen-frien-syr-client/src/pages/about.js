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

const about = (props) => {
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
                        about
                    </Typography>
                    <hr />
                    <Typography variant="body1" color="textPrimary">
                        sensory friendly syracuse is a social media app designed to serve the needs of people in the Syracuse community who would like information about noise levels, lights, and other environmental criteria before venturing out.
                    </Typography>
                    <hr />
                    <Typography variant="body1" color="textPrimary">
                        information about local venues/events is often provided by people who are neurotypical and therefore not as familiar with sensory issues. sfs is a place for the sensory friendly by the sensory friendly.
                    </Typography>
                </div>
            </div>
        </Paper>
    )
};



about.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(about);
