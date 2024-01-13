import { SortOrder } from 'src/lib/types';

export type ModelKeys<T> = {
  [P in keyof T]?: any;
};

export type FieldKeys<T> = keyof T & string;

export type ModelProjectionType<T> = { [P in keyof T]?: string | number };

export interface PaginateOptions {
  page: number;
  pageSize: number;
}

export type SortOptions<T> = { [P in keyof T]: SortOrder };
