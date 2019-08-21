import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
// redux
import { connect } from 'react-redux';
import { markNotificationsAsRead } from '../redux/actions/userActions';
// materialUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import HeartIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

class Notifications extends Component {
    state = {
        anchorEl: null
    }
    handleOpen = (event) => {
        this.setState({ anchorEl: event.target });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    onMenuOpened = () => {
        let unreadNotIds = this.props.notifications
            .filter(not => !not.read)
            .map(not => not.notificationId);
        // this returns us an array of notification IDs where read is set to false
        this.props.markNotificationsAsRead(unreadNotIds);
    }
    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        let notificationsIcon;
        if (notifications && notifications.length > 0) {
            notifications.filter(not => not.read === false).length > 0
                // this will result in only notifications that haven't been read yet
                ? notificationsIcon = (
                    <Badge badgeContent={notifications.filter(not => not.read === false).length} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                ) : (
                    notificationsIcon = <NotificationsIcon />
                )
        } else {
            notificationsIcon = <NotificationsIcon />
        };
        let notificationsMarkup =
            notifications && notifications.length > 0 ? (
                notifications.map(not => {
                    const notType = not.type === 'like' ? 'liked' : 'commented on';
                    // const notTime = dayjs(not.createdAt).fromNow();
                    const iconColor = not.read ? 'primary' : 'secondary';
                    const icon = not.type === 'like' ? (
                        <HeartIcon color={iconColor} style={{ marginRight: 10 }} />
                    ) : (
                            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
                        )

                    return (
                        <MenuItem key={not.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography component={Link} color="textSecondary" variant="body1"
                                to={`/users/${not.recipient}/thought/${not.thoughtId}`}>
                                {not.sender} {notType} your thought
                                {/* {notTime} */}
                            </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                    <MenuItem onClick={this.handleClose}>
                        no notifications at this time
                </MenuItem>
                )
        return (
            <Fragment>
                <Tooltip title="notifications">
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true" onClick={this.handleOpen}>
                        {notificationsIcon}
                    </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} onEntered={this.onMenuOpened}>
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
};

Notifications.propTypes = {
    markNotificationsAsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
});

export default connect(mapStateToProps, { markNotificationsAsRead })(Notifications);