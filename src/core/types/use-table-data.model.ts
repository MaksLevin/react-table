export enum LoadingState {
  Idle,
  Loading,
  Error,
}

export type SortDirection = "asc" | "desc";
export type Filter<T> = Partial<{ [key in keyof T]: string }>;

export interface TableInfo<T> {
  entries: T[];
  sortBy?: keyof T;
  sortDirection: SortDirection;
  filter?: Filter<T>;
  page: number;
  pageSize: number;
  totalEntries: number;
  state: LoadingState;
}

export interface TableControl<T> {
  fetch(): void;
  sortBy(column: keyof T, direction: SortDirection): void;
  filterBy(filter: Filter<T>): void;
  setPage(page: number): void;
  setPageSize(size: number): void;
  nextPage(): void;
  previousPage(): void;
}

export interface FetchFnTableInfo<T> {
  sortBy?: keyof T;
  sortDirection: SortDirection;
  filter?: Filter<T>;
  page: number;
  pageSize: number;
}

export interface FetchFnResult<T> {
  entries: T[];
  totalEntries: number;
}

export interface UseDataTableOptions<T> {
  modificationTableData: (tableInfo: FetchFnTableInfo<T>) => FetchFnResult<T>;
}