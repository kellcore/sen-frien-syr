import React, { Component } from 'react';
import ToolButton from '../components/ToolButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// redux
import { connect } from 'react-redux';
import { likeThought, unlikeThought } from '../redux/actions/dataActions';
// icons
import HeartIcon from '@material-ui/icons/Favorite';
import EmptyHeartIcon from '@material-ui/icons/FavoriteBorder';

export class LikeButton extends Component {
    likedThought = () => {
        if (this.props.user.likes && this.props.user.likes.find((like) => like.thoughtId === this.props.thoughtId))
            return true;
        else return false;
        // we need to check if there's any likes in our user object, otherwise it's false -> there's no likes if there's no like array
    };
    likeThought = () => {
        this.props.likeThought(this.props.thoughtId);
    };
    // technically, a function belonging to a class is called a method because it operates on that class alone
    unlikeThought = () => {
        this.props.unlikeThought(this.props.thoughtId);
    };
    render() {
        const { authenticatedUser } = this.props.user;
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
                    <ToolButton tip="like" onClick={this.likeThought}>
                        <EmptyHeartIcon color="primary" />
                    </ToolButton>
                );
        // console.log(likeButton);

        // if not authenticated, we show the empty heart icon and redirect to the login page, otherwise we are authenticated and we check if there are any likes -> if the thought has a like in our array, we show the full heart & if we haven't liked it, we show the button with the like tip
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    thoughtId: PropTypes.string.isRequired,
    likeThought: PropTypes.func.isRequired,
    unlikeThought: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeThought,
    unlikeThought
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
