import { useEffect, useState } from "react";

import { Filter, LoadingState, SortDirection, TableControl, TableInfo, UseDataTableOptions } from "@core/types/use-table-data.model";

export function useDataTable<T>(
  options: UseDataTableOptions<T>
): [TableInfo<T>, TableControl<T>] {
  const [entries, setEntries] = useState<T[]>([]);
  const [sortBy, setSortBy] = useState<keyof T>();
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [filter, setFilter] = useState<Filter<T>>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0);
  const [state, setState] = useState(LoadingState.Idle);

  const tableInfo: TableInfo<T> = {
    entries,
    sortBy,
    sortDirection,
    filter,
    page,
    pageSize,
    totalEntries,
    state,
  };

  useEffect(() => {
    fetch();
  }, [page, pageSize, sortBy, sortDirection, filter]);

  // new
  async function fetch() {
    try {
      setState(LoadingState.Loading);
      const result = await options.modificationTableData({
        page,
        pageSize,
        sortDirection,
        filter,
        sortBy,
      });
      setState(LoadingState.Idle);
      setEntries(result.entries);
      setTotalEntries(result.totalEntries);
    } catch (e) {
      setState(LoadingState.Error);
    }
  }

  const tableControl: TableControl<T> = {
    // new
    fetch: function (): void {
      fetch();
    },
    sortBy: function (column: keyof T, direction: SortDirection): void {
      setSortBy(column);
      setSortDirection(direction);
    },
    filterBy: function (newFilter: Filter<T>): void {
      setFilter(newFilter);
      setPage(1);
    },
    setPage: function (newPage: number): void {
      const maxPage = totalEntries ? Math.ceil(totalEntries / pageSize) : 1;
      if (newPage > maxPage) {
        setPage(maxPage);
      }
      if (newPage <= 0) {
        setPage(1);
      } else {
        setPage(newPage);
      }
    },
    setPageSize: function (newSize: number): void {
      setPageSize(newSize);
      setPage(1);
    },
    nextPage: function (): void {
      const maxPage = totalEntries ? Math.ceil(totalEntries / pageSize) : 1;
      const newPage = page + 1;
      if (newPage > maxPage) {
        return;
      }
      setPage(newPage);
    },
    previousPage: function (): void {
      const newPage = page - 1;
      if (newPage <= 0) {
        return;
      }
      setPage(newPage);
    },
  };

  return [tableInfo, tableControl];
}
