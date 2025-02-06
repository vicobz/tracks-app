// types/pagination.ts
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    page_size: number;
  }