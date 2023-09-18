import React, { FunctionComponent, memo } from 'react';

import { TableData } from '../../core/models/table-data';

import './table-row.scss';

const TableRow: FunctionComponent<TableData> = ({ id, title, active, date, likes }) => {
  return (
    <tr className="table-row" key={id}>
      <td className="table-cell text-body-medium">{title}</td>
      <td className="table-cell text-body-medium">{active}</td>
      <td className="table-cell text-body-medium">{date}</td>
      <td className="table-cell text-body-medium">{likes}</td>
    </tr>
  );
};

export const MemoizedTableRow = memo(TableRow);
