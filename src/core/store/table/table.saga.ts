import { put, call, takeLatest } from '@redux-saga/core/effects';

import { FetchTableDataSuccess } from './table.action';
import { fetchWrapper } from '../../api/api';
import { setTableDataSuccess } from './table.actionCreators';

const fetchTableDataFromApi = () => fetchWrapper.get('/posts');

function* fetchTableData(): any {
  const data = yield call(fetchTableDataFromApi);
  const dataJson = yield call(() => new Promise((res) => res(data.json())));
  yield put(setTableDataSuccess(dataJson));
}

export function* fetchTableDataWatcher() {
  yield takeLatest(FetchTableDataSuccess, fetchTableData);
}
