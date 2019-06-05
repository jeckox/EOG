import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

/*
  1. The drone service give us a last 30 minutes of metric data
  
  call invokes a method
  put dispatches an action
  takeEvery watches actions and executes a function

  Also -- the `*` in function is important; turns it into a "generator"

*/

function* watchDrone(action) {
    const { error, data } = yield call(API.getDrone);
    if (error) {
        yield put({ type: actions.API_ERROR, code: error.code });
        yield cancel();
        return;
    }
    yield put({ type: actions.DRONE_RECEIVED, data });
}

function* watchAppLoad() {
    yield all([
        takeEvery(actions.FETCH_DRONE, watchDrone),
    ]);
}

export default [watchAppLoad];
