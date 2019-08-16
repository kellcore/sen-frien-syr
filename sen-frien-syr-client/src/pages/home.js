import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import NewThought from '../components/thought/NewThought';
import Profile from '../components/profile/Profile';

import { connect } from 'react-redux';
import { collectThoughts } from '../redux/actions/dataActions';

class home extends Component {
    componentDidMount() {
        this.props.collectThoughts();
    };
    render() {
        const { thoughts, loading } = this.props.data;
        let recentThoughtsMarkup = !loading ? (
            thoughts.map((thought) =>
                <NewThought thought={thought} key={thought.thoughtId} />)
            // creating a component designed specifically to display thoughts -> component name Thought passing in property thought which contains the thought itself
        ) : (<p> Fetching thoughts... </p>);
        // if thoughts exists (not null), then we have the data and we'll show it on the screen, otherwise 
        return (
            <Grid container spacing={8}>
                <Grid item xs={12} sm={12}>
                    <Profile />
                </Grid>
                <Grid item xs={12} sm={12}>
                    {recentThoughtsMarkup}
                </Grid>
            </Grid>
        )
    }
};

home.propTypes = {
    collectThoughts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, { collectThoughts })(home)
