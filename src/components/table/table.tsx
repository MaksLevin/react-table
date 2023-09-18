import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTableDataSuccess } from '../../core/store/table/table.actionCreators';
import { selectTableData } from '../../core/store/table/table.selectors';
import { TableData } from '../../core/models/table-data';
import { MemoizedTableRow } from '../table-row';

import './table.scss';

const Table = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTableDataSuccess());
  }, [dispatch]);

  const { tableList } = useSelector(selectTableData);
  return (
    <table className="table">
      <thead className="table-head">
        <tr className="table-head-row">
          <th className="table-head-title text-h3">Title</th>
          <th className="table-head-title text-h3">Status</th>
          <th className="table-head-title text-h3">Date</th>
          <th className="table-head-title text-h3">Likes</th>
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
