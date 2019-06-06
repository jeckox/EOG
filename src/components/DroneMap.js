import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import LinearProgress from "@material-ui/core/LinearProgress";

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAPrEKRJMUOv7hPkg6bZaC-KSWRYI4K1t8&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap defaultZoom={3} defaultCenter={{ lat: props.position.latitude, lng: props.position.longitude }}>
        <Marker position={{ lat: props.position.latitude, lng: props.position.longitude }}  />
    </GoogleMap>
)
const renderMap = mapInfo => {
    return <MyMapComponent
        isMarkerShown="true" position={mapInfo}
    />
};
class DroneMap extends Component {
    componentDidMount() {
        setInterval(() => {
            this.props.onLoad();
        }, 4000);
    }
    render() {
        const {
            loadingMap,
            actualMap
        } = this.props;
        if (loadingMap) return <LinearProgress />;
        return (renderMap(actualMap))
    }
}
const mapState = (state, ownProps) => {
    const {
        actualMap,
        loadingMap
    } = state.drone;
    return {
        actualMap,
        loadingMap
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
)(DroneMap);
