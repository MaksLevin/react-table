import { ReducerTableData } from '../../models/table-data';
import { SetTableDataSuccess } from './table.action';

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
    default:
      return state;
  }
}
