import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ToolButton from '../components/ToolButton';
import ShareThought from '../components/ShareThought';
// redux
import { connect } from 'react-redux';
// materialui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
import ContactIcon from '@material-ui/icons/ContactSupport';
import AccountIcon from '@material-ui/icons/AccountCircle';
import SignupIcon from '@material-ui/icons/HowToReg';
import AboutIcon from '@material-ui/icons/Description';
import CreditsIcon from '@material-ui/icons/Copyright';

// makes compile time slower to import all at once -> also need individual components for tree shaking



class Navbar extends Component {
    render() {
        const { authenticatedUser } = this.props;
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    {authenticatedUser ? (
                        <Fragment>
                            <Link to="/">
                                <ToolButton tip="home">
                                    <HomeIcon />
                                </ToolButton>
                            </Link>
                            <ShareThought />
                            <ToolButton tip="notifications">
                                <Notifications />
                            </ToolButton>
                            <Link to="/about">
                                <ToolButton tip="about">
                                    <AboutIcon />
                                </ToolButton>
                            </Link>
                            <Link to="/contact">
                                <ToolButton tip="contact">
                                    <ContactIcon />
                                </ToolButton>
                            </Link>
                            <Link to="/credits">
                                <ToolButton tip="credits">
                                    <CreditsIcon />
                                </ToolButton>
                            </Link>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Link to="/">
                                    <ToolButton tip="home">
                                        <HomeIcon />
                                    </ToolButton>
                                </Link>
                                <Link to="/login">
                                    <ToolButton tip="login">
                                        <AccountIcon />
                                    </ToolButton>
                                </Link>
                                <Link to="/signup">
                                    <ToolButton tip="signup">
                                        <SignupIcon />
                                    </ToolButton>
                                </Link>
                                <Link to="/about">
                                    <ToolButton tip="about">
                                        <AboutIcon />
                                    </ToolButton>
                                </Link>
                                <Link to="/contact">
                                    <ToolButton tip="contact">
                                        <ContactIcon />
                                    </ToolButton>
                                </Link>
                                <Link to="/credits">
                                    <ToolButton tip="credits">
                                        <CreditsIcon />
                                    </ToolButton>
                                </Link>
                            </Fragment>
                        )}
                    {/* if user is authenticated, display navbar with notification and share icons, otherwise, display navbar with login and signup icons */}
                </Toolbar>
            </AppBar>
        )
    }
};

Navbar.propTypes = {
    authenticatedUser: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    authenticatedUser: state.user.authenticatedUser
})

export default connect(mapStateToProps)(Navbar);


