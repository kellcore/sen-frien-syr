import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ToolButton from './ToolButton';
import dayJS from 'dayjs';
import { Link } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
import { collectThought } from '../redux/actions/dataActions';
// materialui
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// icons
import CloseIcon from '@material-ui/icons/Close';

const styles = {

};

class ThoughtExpander extends Component {

};

ThoughtExpander.propTypes = {
    collectThought: PropTypes.func.isRequired,
    thoughtId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    thought: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    thought: state.data.thought,
    ui: state.ui
});

const mapActionsToProps = {
    collectThought
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ThoughtExpander));