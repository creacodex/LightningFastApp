export interface EntitiesResult<T> {
  totalRows: number;
  entities: T[];
  errorType: number;
  message: string;
  source: string;
  stackTrace: string;
}
