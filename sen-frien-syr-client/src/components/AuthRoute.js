import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, authenticatedUser, ...rest }) => (
    // destructuring props we'll be using above and using spread operator for the rest
    <Route
        {...rest}
        render={(props) => authenticatedUser === true ? <Redirect to="/" /> : <Component {...props} />}
    // if user is authenticated, we redirect to home page, otherwise display login or signup pages
    />
    // closes route component
);
// changed syntax to parenthesis so it will return something right away

export default AuthRoute;