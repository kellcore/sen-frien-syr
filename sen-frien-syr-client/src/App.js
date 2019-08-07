import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import 'typeface-roboto';
// pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import about from './pages/about';
import contact from './pages/contact';
import credits from './pages/credits';
// components
import Navbar from './components/navbar';

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

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
              <Route exact path="/about" component={about} />
              <Route exact path="/contact" component={contact} />
              <Route exact path="/credits" component={credits} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
};

export default App;

// <div>Icons made by <a href="https://www.flaticon.com/authors/geotatah" title="geotatah">geotatah</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>