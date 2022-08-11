import { call, put } from "redux-saga/effects";


export const sendRequest = async (url: string, method = "GET", body = null, headers = {}) => {

  try {
    console.log(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}${url}`)
    const response: any = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}${url}`,
      { method, body, headers }
    );
    
    const responseData: any = await response.json();
    if (!response.ok) {throw new Error(responseData.message);}

    return responseData;

  } catch (err) { throw err; }
  
};

export function* loadAndCall(func, startLoad, finishLoad, type, payload, isServer) {
  try {

    if (startLoad.type === "START_ACTION" ||
        startLoad.type === "REFRESH_ACTION_START") 
          yield put(startLoad);
    else 
      yield put({ type: startLoad });
    
    
    const fetched = isServer
      ? JSON.parse(yield call(func, payload))
      : yield call(func, payload);
    
    yield put({ type: type, results: fetched });
  }
  catch (err) {}
  finally {

    if (finishLoad.type === "STOP_ACTION" ||
        finishLoad.type === "REFRESH_ACTION_STOP") 
          yield put(finishLoad);
    else 
      yield put({ type: finishLoad });
  }
}
