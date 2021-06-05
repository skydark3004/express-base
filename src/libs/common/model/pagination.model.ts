/**
 * @module common
 * @description common module pagination
 */

export interface PaginationModel<T> {
  data: T;
  page: number;
  pageSize: number;
  totalPage: number;
  totalItem: number;
}

export interface PaginateParamsModel {
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: 1 | -1 | '1' | '-1';
  select?: string;
  populations?: string;
  where?: string;
  pattern?: string;
}
