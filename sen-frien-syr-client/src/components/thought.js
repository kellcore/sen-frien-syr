import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
// materialUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        midWidth: 200
    },
    content: {
        padding: 25
    }
};

class thought extends Component {
    render() {
        const { classes, thought: { body, createdAt, userImage, userHandle, thoughtId, likeCount, commentCount } } = this.props;
        // ^ same as const classes = this.props.classes
        // thought here is being referenced on the home page -> also has properties
        // destructuring!!!
        return (
            <Card className={classes.card}>
                {/* // classes.card comes from classes object above */}
                <CardMedia className={classes.image}
                    image={userImage}
                    title="profile pic" />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color='primary'>{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{createdAt.toString()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(thought);
