import { put, call, takeLatest } from '@redux-saga/core/effects';
import { collection, getDocs } from "firebase/firestore";

import { FetchTableDataSuccess } from './table.action';
import { setTableDataSuccess } from './table.actionCreators';

import { db } from '../../../firebase-config';

/* Use this for json server */
// const fetchTableDataFromApi = () => fetchWrapper.get('/posts');

const fetchTableDataFromFireStore = async () => {
  return await getDocs(collection(db, "posts"))
    .then((querySnapshot)=> {               
      return querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
    })
}

function* fetchTableData(): any {
  const data = yield call(fetchTableDataFromFireStore);
  yield put(setTableDataSuccess(data));

  /* Use this for json server */
  // const dataJson = yield call(() => new Promise((res) => res(data.json())));
}

export function* fetchTableDataWatcher() {
  yield takeLatest(FetchTableDataSuccess, fetchTableData);
}
