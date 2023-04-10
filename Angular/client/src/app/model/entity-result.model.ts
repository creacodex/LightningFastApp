export interface EntityResult<T> {
    entity: T;
    errorType: number;
    message: string;
    source: string;
    stackTrace: string;
}
