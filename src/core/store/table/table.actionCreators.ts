import { TableData } from './table-data';
import { FetchTableDataSuccess, SetTableDataSuccess } from './table.action';

export function setTableDataSuccess(value: TableData) {
  return {
    type: SetTableDataSuccess,
    value,
  };
}

export function fetchTableDataSuccess() {
  return {
    type: FetchTableDataSuccess,
  };
}
