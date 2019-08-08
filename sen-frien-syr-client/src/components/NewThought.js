import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// materialUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

// 


const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        maxWidth: 400
    },
    media: {
        minWidth: 200,
        height: 250
        //         width: 250
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

class NewThought extends Component {
    render() {
        const { classes, thought: { body, createdAt, userImage, userHandle, thoughtId, likeCount, commentCount } } = this.props;
        // ^ same as const classes = this.props.classes
        // thought here is being referenced on the home page -> also has properties
        // destructuring!!! 
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        image={userImage}
                        title="profile pic"
                        className={classes.media}
                        component="img"
                    />
                    <CardContent className={classes.content}>
                        <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                        <Typography variant="body2" color="textSecondary">{createdAt}</Typography>
                        <Typography variant="body1">{body}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    };
};

export default (withStyles(styles)(NewThought));
