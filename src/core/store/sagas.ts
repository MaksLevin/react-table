import { all } from '@redux-saga/core/effects';
import { fetchTableDataWatcher } from './table/table.saga';
import { authWatcher } from './auth/auth.saga';

export function* rootWatcher() {
  yield all([fetchTableDataWatcher(), authWatcher()]);
}
