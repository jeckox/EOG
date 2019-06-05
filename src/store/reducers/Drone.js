import * as actions from "../actions";

const initialState = {
    loading: false,
    firstTime: true,
    datas: []
};

const addZ = n => (n <= 9 ? '0' + n : n);
const toDate = theTime => {
    let theOriginalDate = new Date(theTime);
    let yearDate = theOriginalDate.getFullYear() + '-' + addZ(theOriginalDate.getMonth() + 1) + '-' + addZ(theOriginalDate.getDate());
    let timeDate = addZ(theOriginalDate.getHours() + 1) + ':' + addZ(theOriginalDate.getMinutes() + 1) + ':' + addZ(theOriginalDate.getSeconds() + 1);
    return yearDate + ' ' + timeDate;
}
const startLoading = (state, action) => {
    return {...state, loading: true };
};

const droneDataRecevied = (state, action) => {
    const { data } = action.data;
    let graphData;
    if (!data.length) return state;
    graphData = data.map(function(d) {
        return { x: toDate(d.timestamp), y: d.metric }
    });


    return {
        ...state,
        loading: false,
        firstTime: false,
        datas: graphData
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