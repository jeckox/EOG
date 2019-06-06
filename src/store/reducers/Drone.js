import * as actions from "../actions";

const initialState = {
    loadingChart: true,
    loadingMap: true,
    lastPosition: {},
    actualData: [],
    grapHistory: [],
    mapHistory: []
};

const addZ = n => (n <= 9 ? '0' + n : n);
const toDate = theTime => {
    let theOriginalDate = new Date(theTime);
    let yearDate = theOriginalDate.getFullYear() + '-' + addZ(theOriginalDate.getMonth() + 1) + '-' + addZ(theOriginalDate.getDate());
    let timeDate = addZ(theOriginalDate.getHours() + 1) + ':' + addZ(theOriginalDate.getMinutes() + 1) + ':' + addZ(theOriginalDate.getSeconds() + 1);
    return yearDate + ' ' + timeDate;
}
const startLoading = (state, action) => {
    return {...state };
};

const droneDataRecevied = (state, action) => {
    const { data } = action.data;
    let graphData;
    let mapData;
    if (!data.length) return state;
    graphData = data.map(function(d) {
        return { x: toDate(d.timestamp), y: d.metric }
    });
    mapData = data[data.length - 1];
    return {
        ...state,
        loadingChart: false,
        loadingMap: false,
        actualData: graphData,
        actualMap: mapData,
        mapHistory: [mapData, ...state.mapHistory],
        grapHistory: [graphData, ...state.grapHistory]
    };
};

const handlers = {
    [actions.FETCH_DRONE]: startLoading,
    [actions.DRONE_RECEIVED]: droneDataRecevied
};

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === "undefined") return state;
    return handler(state, action);
};