import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Thought from '../components/NewThought';
import StaticProfile from '../components/StaticProfile';
// materialUI
import Grid from '@material-ui/core/Grid';
//redux
import { connect } from 'react-redux';
import { collectOneUsersThoughts } from '../redux/actions/dataActions';

class user extends Component {
    state = {
        profile: null
    };
    componentDidMount() {
        const handle = this.props.match.params.selectHandle;
        // this comes from the route in App.js -> users/:selectHandle
        this.props.collectOneUsersThoughts(handle);
        axios.get(`/user/${handle}`)
            // sending another request to axios to get the user's details
            .then(res => {
                this.setState({
                    profile: res.data.user
                    // this profile will be static so we don't need to store it in the global state
                });
            })
            .catch(err => console.log(err));

    };
    render() {
        const { thoughts, loading } = this.props.data;
        const thoughtsMarkup = loading ? (
            <p> loading... </p>
        ) : thoughts === null ? (
            <p> no thoughts shared from this user </p>
        ) : (
                    thoughts.map(thought => <Thought key={thought.thoughtId} thought={thought} />)
                );
        // doing a check here to see if there are any thoughts since there could be a user with none
        return (
            <Grid container spacing={8}>
                <Grid item xs={12} sm={12}>
                    {this.state.profile === null ? (
                        <p> loading profile... </p>
                    ) : (<StaticProfile profile={this.state.profile} />)}
                    {/* we have to check to see if the state of the profile is null, in which case we display loading text, otherwise the state is not null and we show the static profile */}
                </Grid>
                <Grid item xs={12} sm={12}>
                    {thoughtsMarkup}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    collectOneUsersThoughts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, { collectOneUsersThoughts })(user);
// we only need one action so we can put it in this object instead of mapping actions to props
