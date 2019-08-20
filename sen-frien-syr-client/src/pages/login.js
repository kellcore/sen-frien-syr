import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import CityIcon from '../images/enterprise.png';
import Logo from '../images/Logo2.png';

// redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

// materialui
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';


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
    },
    paper: {
        padding: 20
    }
};

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            // loading: false,
            // when you press the login button, this will show a spinner while it waits for data to come back from the server
            errors: {}
        };
    };
    // componentWillReceiveProps(nextProps) {
    componentDidUpdate(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors });
            // if we actually get errors, then we set errors to that object
        }
    };
    // the component won't receive props right away -> solves error of errors not showing up on login screen
    handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);

    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    render() {
        const { classes, ui: { loading } } = this.props;
        // loading is now inside the ui in our global state so we have to destructure it like this
        const { errors } = this.state;
        return (
            <Paper className={classes.paper}>
                <Grid container className={classes.formContainer}>
                    <Grid item sm />
                    <Grid item sm>
                        <img src={Logo} alt="city icon" height='150' width='150' className={classes.image} />
                        <Typography variant="h2" className={classes.pageTitle}>
                            login
                    </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                id='email' name='email' type='email' label='e-mail:'
                                className={classes.textField} helperText={errors.email} error={errors.email ? true : false} value={this.state.email}
                                // helperText is how we render the errors to the screen -> if there are no errors, nothing will show there
                                onChange={this.handleChange} fullWidth />
                            <TextField id='password' name='password' type='password' label='password:'
                                className={classes.textField} value={this.state.password}
                                helperText={errors.password} error={errors.password ? true : false}
                                onChange={this.handleChange} fullWidth />
                            {errors.general && (
                                <Typography variant="body2" className={classes.customError}>
                                    {errors.general}
                                </Typography>
                            )}
                            {/* putting text inside curly braces like this is called a conditional */}
                            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                                {/* disabled is a boolean -> we pass it loading so you can't click on the button while it's loading  */}
                                login
                        {loading && (
                                    <CircularProgress size={30} className={classes.progress} />
                                )}
                            </Button>
                            <br />
                            <Typography variant="body2" className={classes.smallText} color="primary">
                                don't have an account? sign up <Link to="/signup"> here </Link>
                            </Typography>
                        </form>
                    </Grid>
                    <Grid item sm />
                </Grid>
            </Paper>
        )
    }
};

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});
// a function that lets us take what we need from our global state

const mapActionsToProps = {
    loginUser
};
// tells connect which actions we're going to use

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));

