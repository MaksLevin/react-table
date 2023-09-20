import React, { useEffect, memo, FunctionComponent, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchSortableTableDataSuccess,
  fetchTableDataSuccess,
} from '../../core/store/table/table.actionCreators';
import { selectTableData } from '../../core/store/table/table.selectors';
import { TableData } from '../../core/store/table/table-data.model';
import { MemoizedTableRow } from '../table-row';

import './table.scss';

const Table: FunctionComponent = () => {
  const [sortConfig, setSortConfig] = useState({ field: '', direction: '' });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTableDataSuccess());
  }, [dispatch]);

  const requestSort = useCallback(
    (field: any) => {
      let direction = 'asc';
      if (sortConfig.field === field && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ field, direction });
      dispatch(fetchSortableTableDataSuccess(field, direction));
    },
    [sortConfig, dispatch]
  );

  const { tableList } = useSelector(selectTableData);
  return (
    <table className="table">
      <thead className="table-head">
        <tr className="table-head-row">
          <th
            className="table-head-title text-h3"
            onClick={() => {
              requestSort('title');
            }}
          >
            Title
          </th>
          <th
            className="table-head-title text-h3"
            onClick={() => {
              requestSort('active');
            }}
          >
            Status
          </th>
          <th
            className="table-head-title text-h3"
            onClick={() => {
              requestSort('date');
            }}
          >
            Date
          </th>
          <th
            className="table-head-title text-h3"
            onClick={() => {
              requestSort('likes');
            }}
          >
            Likes
          </th>
        </tr>
      </thead>
      <tbody className="table-body">
        {tableList.map((item: TableData) => {
          return [
            <MemoizedTableRow
              key={`main-${item.id}`}
              id={item.id}
              title={item.title}
              active={item.active}
              date={item.date}
              likes={item.likes}
            />,
          ];
        })}
      </tbody>
    </table>
  );
};

export const MemoizedTable = memo(Table);
