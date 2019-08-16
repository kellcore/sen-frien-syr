import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// materialUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// redux
import { connect } from 'react-redux';
import { enterComment } from '../redux/actions/dataActions';

const styles = {
    button: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    textField: {
        marginBottom: '20px'
    },
    visible: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBotton: '20'
    }
};


class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors });
        }
        if (!nextProps.ui.errors && !nextProps.ui.loading) {
            this.setState({ body: '' });
        }
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.enterComment(this.props.thoughtId, { body: this.state.body });
    }
    render() {
        const { classes, authenticatedUser } = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticatedUser ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body" type="text" label="what do you think about this thought?"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField} />
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        enter
                    </Button>
                    <hr className={classes.visible} />
                </form>
            </Grid>
        ) : null

        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    enterComment: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    thoughtId: PropTypes.string.isRequired,
    authenticatedUser: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    ui: state.ui,
    authenticatedUser: state.user.authenticatedUser
})

export default connect(mapStateToProps, { enterComment })(withStyles(styles)(CommentForm));
