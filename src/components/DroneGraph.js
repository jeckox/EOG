import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import ListItemText from "@material-ui/core/ListItemText";
// import LinearProgress from "@material-ui/core/LinearProgress";


class DroneGraph extends Component {
    componentDidMount() {
        this.props.onLoad();
    }
    render() {
        const {
            loading
        } = this.props;
        if (loading) return <ListItemText primary="Connect to the Drone API" /> ;
        return ( <ListItemText primary="Connect to the Drone API - Done" /> );
    }
}

const mapState = (state, ownProps) => {
    const {
        loading
    } = state.drone;
    return {
        loading
    };
};

const mapDispatch = dispatch => ({
    onLoad: () =>
        dispatch({
            type: actions.FETCH_DRONE
        })
});

export default connect(
    mapState,
    mapDispatch
)(DroneGraph);
