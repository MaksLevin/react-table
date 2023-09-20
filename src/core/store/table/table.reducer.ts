import { ReducerTableData } from './table-data.model';
import { SetSortableTableDataSuccess, SetTableDataSuccess } from './table.action';

export const initialState: ReducerTableData = {
  tableList: [],
};

export function reducerTableData(state = initialState, action: any) {
  switch (action.type) {
    case SetTableDataSuccess:
      return {
        ...state,
        tableList: action.value,
      };
    case SetSortableTableDataSuccess:
      return {
        ...state,
        tableList: action.value,
      };
    default:
      return state;
  }
}
