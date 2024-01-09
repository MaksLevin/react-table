import React, { useEffect, memo, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { LoadingState, useDataTable } from '../../core/utils/use-table-data';
import {
  fetchTableDataSuccess,
} from '../../core/store/table/table.actionCreators';
import { selectTableData } from '../../core/store/table/table.selectors';
import { TableData } from '../../core/store/table/table-data.model';

import { MemoizedTableRow } from '../table-row';

import './table.scss';

const Table: FunctionComponent = () => {
  const dispatch = useDispatch();

  const { tableList } = useSelector(selectTableData);

  const [tableInfo, tableControl] = useDataTable<TableData>({ modificationTableData });

  function updateFilter(key: keyof TableData, query: string) {
    filterDelay(() => {
      tableControl.filterBy({ ...(tableInfo.filter ?? {}), [key]: query });
    });
  }

  function updateSorting(column: keyof TableData) {
    if (tableInfo.sortBy === column) {
      tableControl.sortBy(
        column,
        tableInfo.sortDirection === 'asc' ? 'desc' : 'asc'
      );
    } else {
      tableControl.sortBy(column, 'asc');
    }
  }

  function getSortArrow(column: string) {
    if (tableInfo.sortBy === column) {
      return tableInfo.sortDirection === 'asc' ? '▲' : '▼';
    } else {
      return '';
    }
  }

  function modificationTableData(options: {
    sortBy?: string;
    sortDirection?: "asc" | "desc";
    filter?: Partial<{ [key in keyof TableData]: string }>;
    page: number;
    pageSize: number;
  }) {
    let result = [...tableList];

    if (options.filter) {
      for (const key of Object.keys(options.filter)) {
        const query = options.filter[key as keyof TableData] as string;
        result = result.filter((entry) =>
          entry[key as keyof TableData]
            .toString().toLowerCase()
            .includes(query.toLowerCase())
        );
      }
    }

    if (options.sortBy && options.sortDirection) {
      result.sort((a, b) => {
        const comparisonValue =
          a[options.sortBy as keyof TableData] <
          b[options.sortBy as keyof TableData]
            ? 1
            : -1;
        return options.sortDirection === "asc"
          ? comparisonValue
          : -comparisonValue;
      });
    }

    let pageIndex = options.page - 1;

    if (pageIndex > result.length - 1) {
      pageIndex = result.length - 1;
    }

    const totalEntries = result.length;

    result = result.splice(pageIndex * options.pageSize, options.pageSize);

    return {
      entries: result,
      totalEntries,
    };
  }

  let filterTimeout: number;
  function filterDelay(cb: () => void) {
    if (filterTimeout) {
      clearTimeout(filterTimeout);
    }
    filterTimeout = window.setTimeout(cb, 250);
  }

  useEffect(() => {
    dispatch(fetchTableDataSuccess());
  }, [dispatch]);

  useEffect(() => {
    tableControl.fetch();
  }, [tableList]);

  return (
    <table className="table">
      <thead className="table-head">
        <tr className="table-head-row">
          <th
            className="table-head-title text-h3"
            onClick={() => updateSorting('title')}
          >
            Title {getSortArrow('title')}
          </th>
          <th
            className="table-head-title text-h3"
            onClick={() => updateSorting('active')}
          >
            Status {getSortArrow('active')}
          </th>
          <th
            className="table-head-title text-h3"
            onClick={() => updateSorting('date')}
          >
            Date {getSortArrow('date')}
          </th>
          <th
            className="table-head-title text-h3"
            onClick={() => updateSorting('likes')}
          >
            Likes {getSortArrow('likes')}
          </th>
        </tr>
        <tr className="table-head-row">
          <th className="table-head-title text-h3">
            <TextField
              fullWidth
              onChange={(event) => updateFilter('title', event.target.value)}
              placeholder="Search title..."
            />
          </th>
          <th className="table-head-title text-h3">
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                onChange={(event) => updateFilter('active', event.target.value!.toString())}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
          </th>
          <th className="table-head-title text-h3">
            <TextField
              fullWidth
              onChange={(event) => updateFilter('date', event.target.value)}
              placeholder="Date filter"
              type="number"
            />
          </th>
          <th className="table-head-title text-h3">
            <TextField
              type="number"
              onChange={(event) => updateFilter('likes', event.target.value)}
              fullWidth
              placeholder="Search likes..."
            />
          </th>
        </tr>
      </thead>
      <tbody className="table-body">
      {tableInfo.state === LoadingState.Loading ? (
          /** Loading Indicator */
          <tr>
            <td>
              Loading ...
            </td>
          </tr>
        ) : (
          /** Table Rows */
          tableInfo.entries.map((item: TableData) => (
            <MemoizedTableRow
              key={`main-${item.id}`}
              id={item.id}
              title={item.title}
              active={item.active ? 'true' : 'false'}
              date={item.date}
              likes={item.likes}
             />
          ))
        )}
      </tbody>
      {/** Paginator */}
      <tfoot className="table-footer">
        <tr className="table-footer-row">     
          <td className="table-footer-cell">
            <div className="table-footer-pagination">
              <div className="table-footer-total-entries">
                Total Entries: {tableInfo.totalEntries}
              </div>
              <div className="table-footer-paging">
                <div>
                  Items per page:
                  <select
                    onChange={(event) =>
                      tableControl.setPageSize(parseInt(event.target.value))
                    }
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <div
                  className="table-footer-button"
                  onClick={() => tableControl.previousPage()}
                >
                  &lt;
                </div>
                {`Page ${tableInfo.page} of ${Math.ceil(
                  tableInfo.totalEntries / tableInfo.pageSize
                )}`}
                <div
                  className="table-footer-button"
                  onClick={() => tableControl.nextPage()}
                >
                  &gt;
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export const MemoizedTable = memo(Table);
