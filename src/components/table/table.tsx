import React, { useEffect, memo, FunctionComponent, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchSortableTableDataSuccess,
  fetchTableDataSuccess,
} from '../../core/store/table/table.actionCreators';
import { selectTableData } from '../../core/store/table/table.selectors';
import { TableData } from '../../core/store/table/table-data.model';
import { MemoizedTableRow } from '../table-row';

import './table.scss';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const Table: FunctionComponent = () => {
  const dispatch = useDispatch();

  const { tableList } = useSelector(selectTableData);
  const [sortConfig, setSortConfig] = useState({ field: '', direction: '' });
  const [tableData, setTableData] = useState([]);

  const [searchTermTitle, setSearchTermTitle] = useState('');
  const [searchTermLikes, setSearchTermLikes] = useState('');
  const [searchTermStatus, setSearchTermStatus] = useState('');
  const [searchTermDate, setSearchTermDate] = useState('');

  const searchTitle = (searchValue: string): void => {
    if (!searchTermLikes && !searchTermStatus && !searchTermDate) {
      setTableData(
        tableList.filter((item: TableData) => {
          if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return item;
          }
          return null;
        })
      );
    }
    if (searchTermLikes || searchTermStatus || searchTermDate) {
      setTableData(
        tableData.filter((item: TableData) => {
          if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return item;
          }
          return null;
        })
      );
    }
  };

  const searchLikes = (searchValue: string): void => {
    if (!searchTermTitle && !searchTermStatus && !searchTermDate) {
      setTableData(
        tableList.filter((item: TableData) => {
          if (item.likes.toString().includes(searchValue)) {
            return item;
          }
          return null;
        })
      );
    }
    if (searchTermTitle || searchTermStatus || searchTermDate) {
      setTableData(
        tableData.filter((item: TableData) => {
          if (item.likes.toString().includes(searchValue)) {
            return item;
          }
          return null;
        })
      );
    }
  };

  const searchStatus = (searchValue: string): void => {
    if (!searchTermTitle && !searchTermLikes && !searchTermDate) {
      setTableData(
        tableList.filter((item: TableData) => {
          if (item.active.toString().includes(searchValue)) {
            return item;
          }
          return null;
        })
      );
    }
    if (searchTermTitle || searchTermLikes || searchTermDate) {
      setTableData(
        tableData.filter((item: TableData) => {
          if (item.active.toString().includes(searchValue)) {
            return item;
          }
          return null;
        })
      );
    }
  };

  const searchDate = (searchValue: string): void => {
    if (!searchTermTitle && !searchTermLikes && !searchTermStatus) {
      setTableData(
        tableList.filter((item: TableData) => {
          if (item.date.includes(searchValue)) {
            return item;
          }
          return null;
        })
      );
    }
    if (searchTermTitle || searchTermLikes || searchTermStatus) {
      setTableData(
        tableData.filter((item: TableData) => {
          if (item.date.includes(searchValue)) {
            return item;
          }
          return null;
        })
      );
    }
  };

  const setFilter = useMemo(() => {
    if (searchTermTitle) {
      searchTitle(searchTermTitle);
    }
    if (searchTermLikes) {
      searchLikes(searchTermLikes);
    }
    if (searchTermStatus) {
      searchStatus(searchTermStatus);
    }
    if (searchTermDate) {
      searchDate(searchTermDate);
    }
  }, [searchTermLikes, searchTermTitle, searchTermStatus, searchTermDate]);

  useEffect(() => {
    dispatch(fetchTableDataSuccess());
  }, [dispatch, tableData]);

  const requestSort = useCallback(
    (field: string) => {
      let direction = 'asc';
      if (sortConfig.field === field && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ field, direction });
      dispatch(fetchSortableTableDataSuccess(field, direction));
    },
    [sortConfig, dispatch]
  );

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
        <tr className="table-head-row">
          <th className="table-head-title text-h3">
            <TextField
              fullWidth
              placeholder="Search title..."
              value={searchTermTitle}
              onChange={(e) => setSearchTermTitle(e.target.value)}
            />
          </th>
          <th className="table-head-title text-h3">
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={searchTermStatus}
                label="Status"
                onChange={(e) => setSearchTermStatus(e.target.value)}
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
              placeholder="Date filter"
              type="number"
              value={searchTermDate}
              onChange={(e) => setSearchTermDate(e.target.value)}
            />
          </th>
          <th className="table-head-title text-h3">
            <TextField
              type="number"
              fullWidth
              placeholder="Search likes..."
              value={searchTermLikes}
              onChange={(e) => setSearchTermLikes(e.target.value)}
            />
          </th>
        </tr>
      </thead>
      <tbody className="table-body">
        {searchTermTitle || searchTermLikes || searchTermStatus || searchTermDate
          ? tableData.map((item: TableData) => {
              return [
                <MemoizedTableRow
                  key={`main-${item.id}`}
                  id={item.id}
                  title={item.title}
                  active={item.active ? 'true' : 'false'}
                  date={item.date}
                  likes={item.likes}
                />,
              ];
            })
          : tableList.map((item: TableData) => {
              return [
                <MemoizedTableRow
                  key={`main-${item.id}`}
                  id={item.id}
                  title={item.title}
                  active={item.active ? 'true' : 'false'}
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
