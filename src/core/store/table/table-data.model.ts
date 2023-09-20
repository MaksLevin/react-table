export interface TableData {
  id: number;
  title: string;
  active: string;
  date: string;
  likes: number;
}

export interface ReducerTableData {
  tableList: TableData[];
}
