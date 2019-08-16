import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import 'typeface-roboto';
import jwtDecode from 'jwt-decode';
// jwt -> json web token

// redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';


// pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import about from './pages/about';
import contact from './pages/contact';
import credits from './pages/credits';

// components
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';

import axios from 'axios';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#dc6a33',
      main: '#D44500',
      dark: '#943000',
      contrastText: '#fff'
    },
    secondary: {
      light: '#8b9297',
      main: '#6F777D',
      dark: '#4d5357',
      contrastText: '#fff'
    }
  }
});

// axios.defaults.baseURL = 'https://us-central1-sensoryfriendlysyracuse.cloudfunctions.net/api';


const token = localStorage.fBAuthToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    // calling logoutUser from redux user actions
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    // sets authenticated to true
    axios.defaults.headers.common['Authorization'] = token;
    // axios will query again each time page is refreshed so we have to set this here so token persists
    store.dispatch(getUserData());
  };
  //   decodedToken has a property of exp which is the time in seconds when the token will expire
  //   if there is a token, decode the token using jwtDecode and store the result in the decodedToken variable -> if the exp property * 1000 of decodedToken is less than the current time, the token has expired -> redirect user to login page -> user is no longer authenticated so boolean is false
  // else time has not expired on the token so user is authenticated and boolean is true
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        {/* everything inside the provider will have access to the store which is our state using Redux */}
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/about" component={about} />
              <Route exact path="/contact" component={contact} />
              <Route exact path="/credits" component={credits} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;

// <div>Icons made by <a href="https://www.flaticon.com/authors/geotatah" title="geotatah">geotatah</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>