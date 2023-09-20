import { all } from '@redux-saga/core/effects';
import { fetchSortableTableDataWatcher, fetchTableDataWatcher } from './table/table.saga';

export function* rootWatcher() {
  yield all([fetchTableDataWatcher(), fetchSortableTableDataWatcher()]);
}
