import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ToolButton from '../components/ToolButton';
import Comments from '../components/Comments';
import dayJS from 'dayjs';
import { Link } from 'react-router-dom';
// import LikeButton from '../components/LikeButton';
import CommentForm from '../components/CommentForm';
// redux
import { connect } from 'react-redux';
import { collectThought, clearErrors } from '../redux/actions/dataActions';
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
    },
    visible: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBotton: '20'
    }
};
// have to pass the values in as strings since this is javascript
// rgba(0,0,0,0.1) -> 0.0.0 means it's black and 0.1 gives it an opacity of 10%

class ThoughtExpander extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    };
    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    };
    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, thoughtId } = this.props;
        const newPath = `/users/${userHandle}/thought/${thoughtId}`;

        if (oldPath === newPath) oldPath = `/users/${userHandle}`;

        window.history.pushState(null, null, newPath);


        this.setState({ open: true, oldPath, newPath });
        this.props.collectThought(this.props.thoughtId);
    };
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    };

    render() {
        const { classes, thought: { thoughtId, body, createdAt, commentCount, userHandle, userImage, comments }, ui: { loading } } = this.props;
        // collectThought will get us the thought and set it in our props
        // likeCount,
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
                        {/* <LikeButton thoughtId={thoughtId} />
                        <span> {likeCount} likes </span> */}
                        <ToolButton tip="comment">
                            <ChatIcon color="primary" />
                        </ToolButton>
                        <span> {commentCount} comments </span>
                    </Grid>
                    <hr className={classes.visible} />
                    <CommentForm thoughtId={thoughtId} />
                    <Comments comments={comments} />
                    {/* we're passing our component Comments a prop named comments that contains the value of comments -> that value comes from our deconstructed thought object above */}
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
    ui: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    thought: state.data.thought,
    ui: state.ui
});

const mapActionsToProps = {
    collectThought,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ThoughtExpander));