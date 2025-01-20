import { combineReducers } from 'redux';

import { reducerTableData } from './table/table.reducer';
import { authReducer } from './auth/auth.reducer';

export const rootReducer = combineReducers({
  reducerTableData,
  authReducer,
});
