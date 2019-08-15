import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ToolButton from './ToolButton';
import dayJS from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
// redux
import { connect } from 'react-redux';
import { collectThought } from '../redux/actions/dataActions';
// materialui
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldIcon from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';


const styles = {
    horizontalRuler: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    circularProgress: {
        textAlign: 'center',
        marginTop: '50',
        marginBottom: '50'
    }
};

class ThoughtExpander extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
        this.props.collectThought(this.props.thoughtId);
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, thought: { thoughtId, body, createdAt, likeCount, commentCount, userHandle, userImage }, ui: { loading } } = this.props;
        // collectThought will get us the thought and set it in our props
        const dialogMarkup = loading ? (
            <div className={classes.circularProgress}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
                <Grid container spacing={10}>
                    <Grid item sm={5}>
                        <img src={userImage} alt="user" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
                            @{userHandle}
                        </Typography>
                        <hr className={classes.horizontalRuler} />
                        <Typography variant="body2" color="textSecondary">
                            {dayJS(createdAt).format('h:mm a MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.horizontalRuler} />
                        <Typography variant="body1">
                            {body}
                        </Typography>
                        <LikeButton thoughtId={thoughtId} />
                        <span> {likeCount} likes </span>
                        <ToolButton tip="comment">
                            <ChatIcon color="primary" />
                        </ToolButton>
                        <span> {commentCount} comments </span>
                    </Grid>
                </Grid>
            );
        // if loading, display giant circular progress, otherwise 

        return (
            <Fragment>
                <ToolButton onClick={this.handleOpen} tip="expand thought" tipClassName={classes.expandButton}>
                    <UnfoldIcon color="primary" />
                </ToolButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <ToolButton tip="close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon color="secondary" />
                    </ToolButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    };


};

ThoughtExpander.propTypes = {
    collectThought: PropTypes.func.isRequired,
    thoughtId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    thought: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    thought: state.data.thought,
    ui: state.ui
});

const mapActionsToProps = {
    collectThought
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ThoughtExpander));