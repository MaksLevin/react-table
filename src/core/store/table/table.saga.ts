import { put, call, takeLatest } from '@redux-saga/core/effects';

import { FetchSortableTableDataSuccess, FetchTableDataSuccess } from './table.action';
import { fetchWrapper } from '../../api/api';
import { setSortableTableDataSuccess, setTableDataSuccess } from './table.actionCreators';

const fetchTableDataFromApi = () => fetchWrapper.get('/posts');

function* fetchTableData(): any {
  const data = yield call(fetchTableDataFromApi);
  const dataJson = yield call(() => new Promise((res) => res(data.json())));
  yield put(setTableDataSuccess(dataJson));
}

export function* fetchTableDataWatcher() {
  yield takeLatest(FetchTableDataSuccess, fetchTableData);
}

function* fetchSortableTableData(value: any): any {
  const fetchSortTableDataFromApi = () =>
    fetchWrapper.get(`/posts?_sort=${value.field}&_order=${value.direction}`);

  const data = yield call(fetchSortTableDataFromApi);
  const dataJson = yield call(() => new Promise((res) => res(data.json())));
  yield put(setSortableTableDataSuccess(dataJson));
}

export function* fetchSortableTableDataWatcher() {
  yield takeLatest(FetchSortableTableDataSuccess, fetchSortableTableData);
}
