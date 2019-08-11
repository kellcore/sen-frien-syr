import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import CityIcon from '../images/enterprise.png';

// materialui
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = {
    formContainer: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '20px auto 20px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: '20px',
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: '10px'
    },
    smallText: {
        marginTop: '20px'
    },
    progress: {
        position: 'absolute'
        // this will put the spinner in the center of the button
    }
};

class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            selectHandle: '',
            errors: {}
        }
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors });
            // if we actually get errors, then we set errors to that object
        }
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            selectHandle: this.state.selectHandle
        };
        this.props.signupUser(newUserData, this.props.history);
        // axios.post('/signup', newUserData)
        //     .then(res => {
        //         console.log(res.data);
        //         localStorage.setItem('fBAuthToken', `Bearer ${res.data.token}`);
        //         this.setState({
        //             loading: false
        //             // if we get this far, we've been successful in logging in, so loading spinner can go back to default false
        //         });
        //         this.props.history.push('/');
        //         // can use .push() method in react to push state -> this is how we're telling it to redirect us to the home page after we log in!
        //     })
        //     .catch(err => {
        //         this.setState({
        //             errors: err.response.data,
        //             loading: false
        //         });
        //     });
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    render() {
        const { classes, ui: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.formContainer}>
                <Grid item sm />
                <Grid item sm>
                    <img src={CityIcon} alt="city icon" height='150' width='150' className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>
                        signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id='email'
                            name='email'
                            type='email'
                            label='e-mail:'
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false} value={this.state.email}
                            // helperText is how we render the errors to the screen -> if there are no errors, nothing will show there
                            onChange={this.handleChange} fullWidth />

                        <TextField
                            id='password'
                            name='password'
                            type='password'
                            label='password:'
                            className={classes.textField} value={this.state.password}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange={this.handleChange} fullWidth />

                        <TextField
                            id='confirmPassword'
                            name='confirmPassword'
                            type='password'
                            label='confirm password:'
                            className={classes.textField} value={this.state.confirmPassword}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange={this.handleChange} fullWidth />

                        <TextField
                            id='selectHandle'
                            name='selectHandle'
                            type='text'
                            label='select your handle: '
                            className={classes.textField} value={this.state.selectHandle}
                            helperText={errors.selectHandle}
                            error={errors.selectHandle ? true : false}
                            onChange={this.handleChange} fullWidth />

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        {/* putting text inside curly braces like this is called a conditional */}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            {/* disabled is a boolean -> we pass it loading so you can't click on the button while it's loading  */}
                            signup
                        {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <Typography variant="body2" className={classes.smallText} color="primary">
                            already have an account? log in <Link to="/login"> here </Link>
                        </Typography>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
};

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));