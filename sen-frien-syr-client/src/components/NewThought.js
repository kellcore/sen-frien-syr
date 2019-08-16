import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import ToolButton from '../components/ToolButton';
import DeleteThought from '../components/DeleteThought';
// materialUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
// icons
import ChatIcon from '@material-ui/icons/Chat';
import EmptyHeartIcon from '@material-ui/icons/FavoriteBorder';
import HeartIcon from '@material-ui/icons/Favorite';
// redux
import { connect } from 'react-redux';
import { likeThought, unlikeThought } from '../redux/actions/dataActions';

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
    likedThought = () => {
        if (this.props.user.likes && this.props.user.likes.find((like) => like.thoughtId === this.props.thought.thoughtId))
            return true;
        else return false;
        // we need to check if there's any likes in our user object, otherwise it's false -> there's no likes if there's no like array
    };
    likeThought = () => {
        this.props.likeThought(this.props.thought.thoughtId);
    };
    // technically, a function belonging to a class is called a method because it operates on that class alone
    unlikeThought = () => {
        this.props.unlikeThought(this.props.thought.thoughtId);
    };
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
        const likeButton = !authenticatedUser ? (
            <Link to="/login">
                <ToolButton tip="like" onClick={this.likeThought}>
                    <EmptyHeartIcon color="primary" />
                </ToolButton>
            </Link>
        ) : this.likedThought() ? (
            <ToolButton tip="unlike" onClick={this.unlikeThought}>
                <HeartIcon color="primary" />
            </ToolButton>
        ) : (
                    <ToolButton tip="like" >
                        <EmptyHeartIcon color="primary" />
                    </ToolButton>
                );
        // console.log(likeButton);

        // if not authenticated, we show the empty heart icon and redirect to the login page, otherwise we are authenticated and we check if there are any likes -> if the thought has a like in our array, we show the full heart & if we haven't liked it, we show the button with the like tip
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
                    {likeButton}
                    <span> {likeCount} likes </span>
                    <ToolButton tip="comment">
                        <ChatIcon color="primary" />
                    </ToolButton>
                    <span> {commentCount} comments </span>
                </CardContent>
            </Card>
        );
    };
};

NewThought.propTypes = {
    likeThought: PropTypes.func.isRequired,
    unlikeThought: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    thought: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    likeThought,
    unlikeThought
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NewThought));
