import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import NewThought from '../components/NewThought';

class home extends Component {
    state = {
        thoughts: null
    }
    componentDidMount() {
        axios.get('/thoughts')
            .then(res => {
                this.setState({ thoughts: res.data })
                // axios stores data in a key called data
            })
            .catch(err => console.log(err));
    }
    render() {
        let recentThoughtsMarkup = this.state.thoughts ? (
            this.state.thoughts.map(thought => <NewThought thought={thought} key={thought.thoughtId} />)
            // creating a component designed specifically to display thoughts -> component name Thought passing in property thought which contains the thought itself
        ) : <p> Fetching thoughts... </p>
        // if thoughts exists (not null), then we have the data and we'll show it on the screen, otherwise 
        return (
            <Grid container spacing={10}>
                <Grid item xs={12} sm={6}>
                    <p> profile goes here... </p>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {recentThoughtsMarkup}
                </Grid>
            </Grid>
        )
    }
};

export default home
