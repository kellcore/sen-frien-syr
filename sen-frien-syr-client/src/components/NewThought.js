import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import ToolButton from '../components/ToolButton';
import DeleteThought from '../components/DeleteThought';
import ThoughtExpander from '../components/ThoughtExpander';
import LikeButton from '../components/LikeButton';
// materialUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
// icons
import ChatIcon from '@material-ui/icons/Chat';
// redux
import { connect } from 'react-redux';


const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
        // maxWidth: 400,
        // textAlign: 'center'

    },
    media: {
        // minWidth: 200,
        height: 200,
        width: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

class NewThought extends Component {
    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            thought: { body, createdAt, userImage, userHandle, thoughtId, likeCount, commentCount },
            user: {
                authenticatedUser, credentials: { selectHandle }
            }
        } = this.props;
        // ^ same as const classes = this.props.classes
        // thought here is being referenced on the home page -> also has properties
        // destructuring!!!

        const deleteButton = authenticatedUser && userHandle === selectHandle ? (
            <DeleteThought thoughtId={thoughtId} />
        ) : null;
        // console.log(deleteButton);
        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="profile pic"
                    className={classes.media}
                    component="img"
                />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton thoughtId={thoughtId} />
                    {/* we've destructured thoughtId from the thought object in this.props */}
                    <span> {likeCount} likes </span>
                    <ToolButton tip="comment">
                        <ChatIcon color="primary" />
                    </ToolButton>
                    <span> {commentCount} comments </span>
                    <ThoughtExpander thoughtId={thoughtId} userHandle={userHandle} />
                    {/* we're passing it the thoughtId so it uses that to fetch the individual thought */}
                </CardContent>
            </Card>
        );
    };
};

NewThought.propTypes = {
    user: PropTypes.object.isRequired,
    thought: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(NewThought));
