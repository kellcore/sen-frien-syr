import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
// MaterialUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// makes compile time slower to import all at once -> also need individual components for tree shaking



class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    <Button color='inherit' component={Link} to='/'> Home </Button>
                    <Button color='inherit' component={Link} to='/login'> Login </Button>
                    <Button color='inherit' component={Link} to='/signup'> Signup </Button>
                    <Button color='inherit' component={Link} to='/about'> About </Button>
                    <Button color='inherit' component={Link} to='/contact'> Contact </Button>
                    <Button color='inherit' component={Link} to='/credits'> Credits </Button>
                </Toolbar>
            </AppBar>
        )
    }
};

export default Navbar;


