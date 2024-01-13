export interface PaginationQueryPayload<TFilter = unknown, TSort = unknown> {
  filters?: TFilter;
  sorts?: TSort;
  page: number;
  pageSize: number;
}
