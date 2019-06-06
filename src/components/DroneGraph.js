import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import LinearProgress from "@material-ui/core/LinearProgress";

const renderLineChart = dataInfo => {
    return <LineChart width={500} height={300} data={dataInfo} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x"  interval="preserveEnd"/>
        <Tooltip />
        <YAxis domain={['auto', 'auto']}    interval="preserveStart"/>
        <Line dot={false} type='monotone' dataKey='y' stroke='#40c3c5' />
    </LineChart>
};


class DroneGraph extends Component {
    componentDidMount() {
        setInterval(() => {
            this.props.onLoad();
        }, 4000);
    }
    render() {
        const {
            firstTime,
            actualData
        } = this.props;
        if (firstTime) return <LinearProgress /> ;
        return (renderLineChart(actualData));
    }
}

const mapState = (state, ownProps) => {
    const {
        actualData,
        firstTime
    } = state.drone;
    return {
        actualData,
        firstTime
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
