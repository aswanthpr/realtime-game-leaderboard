export interface Ipagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface IDataWithPagination {
  data: IplayerScore[];
  pagination: Ipagination;
}
