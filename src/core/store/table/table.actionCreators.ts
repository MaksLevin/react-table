import { TableData } from './table-data.model';
import {
  FetchSortableTableDataSuccess,
  FetchTableDataSuccess,
  SetSortableTableDataSuccess,
  SetTableDataSuccess,
} from './table.action';

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

export function setSortableTableDataSuccess(value: TableData) {
  return {
    type: SetSortableTableDataSuccess,
    value,
  };
}

export function fetchSortableTableDataSuccess(field: string, direction: string): any {
  return {
    type: FetchSortableTableDataSuccess,
    field,
    direction,
  };
}
