import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../images/Logo2.png';
// materialUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import MuiLink from '@material-ui/core/Link';

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
    },
    horizontalRuler: {
        border: 'none',
        margin: 10
    },
    visible: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBotton: '20'
    }
});

const credits = (props) => {
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
                        credits
                    </Typography>
                    <hr className={classes.horizontalRuler} />
                    <Typography variant="body1" color="textPrimary">
                        this project created by kelly corey
                    </Typography>
                    <hr className={classes.visible} />
                    <Typography variant="body1" color="textPrimary">
                        find more of her work @
                    </Typography>
                    <MuiLink color="primary" variant="h5" >
                        <a href='https://kell.dev/' target="_blank" rel="noopener noreferrer">
                            kell.dev
                            </a>
                    </MuiLink>
                    <Typography variant="body1" color="textPrimary">
                        and follow her on twitter
                    </Typography>
                    <MuiLink color="primary" variant="h5" >
                        <a href='https://twitter.com/kelldeveloped' target="_blank" rel="noopener noreferrer">
                            @kelldeveloped
                            </a>
                    </MuiLink>
                    <hr className={classes.visible} />
                    <Typography variant="body1" color="textPrimary">
                        redux devtools extension by zalmoxisus:
                    </Typography>
                    <MuiLink color="primary" variant="h5" >
                        <a href='https://github.com/zalmoxisus/redux-devtools-extension' target="_blank" rel="noopener noreferrer">
                            https://github.com/zalmoxisus/redux-devtools-extension
                            </a>
                    </MuiLink>
                    <hr className={classes.visible} />
                    <Typography variant="body1" color="textPrimary">
                        Icons made by
                        </Typography>
                    <MuiLink color="primary" variant="h5" >
                        <a href="https://www.flaticon.com/authors/geotatah" title="geotatah">geotatah</a> </MuiLink>
                    <Typography variant="body1" color="textPrimary">
                        from
                        </Typography>
                    <MuiLink color="primary" variant="h5" >
                        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> </MuiLink>
                    <Typography variant="body1" color="textPrimary">
                        is licensed by </Typography>
                    <MuiLink color="primary" variant="h5" >
                        <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
                    </MuiLink>
                    <hr className={classes.visible} />
                    <Typography variant="body1" color="textPrimary">
                        this app built using the react/express/firebase tutorial from </Typography>
                    <MuiLink color="primary" variant="h5" >
                        <a href='https://www.youtube.com/watch?v=m_u6P5k0vP0' target="_blank" rel="noopener noreferrer">
                            @classsed
                            </a>
                    </MuiLink>
                    <hr className={classes.visible} />
                    <Typography variant="body1" color="textPrimary">
                        & a special thanks to viewers like you!
                    </Typography>

                </div>
            </div>
        </Paper>
    )
};



credits.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(credits);
