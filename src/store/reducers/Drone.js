import * as actions from "../actions";

const initialState = {
    loading: false,
    // loading: false,
    // weatherId: null,
    // name: "",
    // temperature: "",
    // weather_state_name: "",
    // latitude: null,
    // longitude: null,
    data: []
};

//const toF = c => (c * 9) / 5 + 32;

const startLoading = (state, action) => {
    return {...state, loading: true };
};

const droneDataRecevied = (state, action) => {
    const { data } = action.data;
    if (!data.length) return state;
    //console.info(data);
    // const weather = data.consolidated_weather[0];
    // const { weather_state_name, the_temp } = weather;
    // const { latt_long, title: name } = data;
    // const [latitude, longitude] = latt_long.split(",");

    return {
        ...state,
        loading: false,
        data: action.data
            // ...state,
            // loading: false,
            // latitude,
            // longitude,
            // temperatureinCelsius: the_temp,
            // temperatureinFahrenheit: toF(the_temp),
            // weather_state_name,
            // name,
            // data: action.data
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