import { call, takeLatest } from 'redux-saga/effects';
import { refreshActionStart, refreshActionStop, startAction, stopAction } from '../store/actions/uiActions';
import { sendRequest, loadAndCall } from './util';



////////////////////////////////////////////////////////////////////////////////////
// SEARCH BPM //

function* BPMSearchAsync(action) {
  try {
    yield call(loadAndCall,
      async () => await sendRequest(`/sounds/search-bpm/${action.bpm}`),
      "MAIN_LOADER_START", "MAIN_LOADER_FINISH", "FETCH_BROWSE_ASYNC", null, false);
  } catch(err) {console.log(err)}
}


export function* watchBPMSearch() {
  yield takeLatest("SEARCH_BPM", BPMSearchAsync);
}
////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////
// FETCH/FILTER BROWSE //

const filterBrowse = async (action) => {
  let response;
  const order = action.lastQuery.lastOrder ? action.lastQuery.lastOrder : 'none';

  response = await sendRequest(
    `/users/filtersoundswquery/${action.params.category}/${action.params.keyword}/${action.params.author}/${action.params.bpm1}/${action.params.bpm2}/${action.params.activeOrderbyOption}`,
    "POST",
    JSON.stringify({
      query: action.lastQuery.text,
      vals: action.lastQuery.vals,
      lastOrder: order
    }),
    { 'Content-Type': 'application/json' }
  );
  
  return response;
  
};


const fetchBrowse = async (action) => {
  let time = action.params.time.text ? action.params.time.text.split(" ").join("") : "alltime";
  
  return await sendRequest(
    `/sounds/browse/${action.params.category}/${action.params.genre.text}/${action.params.type.text}/${time}`
  );
};

function* fetchBrowseAsync({ type, payload }) {
  const { refreshing } = payload;
  try {
    yield call(loadAndCall,
      payload.browseType === "filterWquery" ? filterBrowse : fetchBrowse,
      refreshing ? refreshActionStart(type) : startAction(type),
      refreshing ? refreshActionStop(type) : stopAction(type),
      "FETCH_BROWSE_ASYNC",
      payload, false);
  } catch(err) {console.log(err)}
}

export function* watchFetchBrowse() {
  yield takeLatest("FETCH_BROWSE", fetchBrowseAsync);

}

////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
// REFRESH  BROWSE //
const refreshBrowse = async ({offset, vals, order, query}) => {
  let insertVal;

  if (vals.length === 0) insertVal = "none";
  else insertVal = vals;

  return await sendRequest(
    `/sounds/refreshbrowse/${offset}`,
    'POST', 
    JSON.stringify({query,vals,order}), 
    {'Content-Type': 'application/json'});
};


function* refreshBrowseAsync(action) {
  try {
    yield call(loadAndCall,
      refreshBrowse,
      startAction(action.type),
      stopAction(action.type),
      "REFRESH_BROWSE_ASYNC",
      { offset: action.offset, vals: action.vals, order: action.order, query: action.query },
      false);
  } catch(err) {console.log(err)}
}

export function* watchRefreshBrowse() {
  yield takeLatest("REFRESH_BROWSE", refreshBrowseAsync);
}


////////////////////////////////////////////////////////////////////////////////////
