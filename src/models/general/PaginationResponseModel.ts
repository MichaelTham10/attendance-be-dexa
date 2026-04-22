export interface PaginationResponseModel<T> {
  data: T[];
  perPage: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}