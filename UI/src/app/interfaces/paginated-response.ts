export interface PaginatedResponse<T> {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly results: T[];
}
