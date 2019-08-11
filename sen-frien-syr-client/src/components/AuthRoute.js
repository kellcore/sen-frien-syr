import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, authenticatedUser, ...rest }) => (
    // destructuring props we'll be using above and using spread operator for the rest
    <Route
        {...rest}
        render={(props) => authenticatedUser === true ? <Redirect to="/" /> :
            <Component {...props} />}
    // if user is authenticated, we redirect to home page, otherwise display login or signup pages
    />
    // closes route component
);
// changed syntax to parenthesis so it will return something right away

const mapStateToProps = (state) => ({
    authenticatedUser: state.user.authenticated
});
// this is a function that returns an object

AuthRoute.propTypes = {
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(AuthRoute);
// we don't need any actions in connect here so we omit that argument