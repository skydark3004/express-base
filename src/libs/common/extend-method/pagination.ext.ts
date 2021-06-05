/**
 * @description pagination extension
 */

import * as async from 'async';
import * as Promise from 'bluebird';
import * as mongoose from 'mongoose';
import { PaginateParamsModel, PaginationModel } from '../model';

/**
 * @method paginate
 * @param {PaginateParamsModel} params
 * @param {(err: any, data: PaginationModel<Document[]>) => void} callback
 * @return {Bluebird<PaginationModel<Document[]>>}
 * @example
 {
      sort: _id:1;name:1;address:-1,
      page: number,
      pageSize: number,
      order: 1 | -1 | '1' | '-1',
      select: name:0;email:1,
      populations: wholesaler:name address,
      where: role:wholesaler;status.active.isActive:1,
      pattern: email:manhhipkhmt2;
   }
 */
(mongoose.Query.prototype as any).paginate =
  function (params: PaginateParamsModel = {}, callback?: (err: any, data: PaginationModel<Document[]>)
    => void): Promise<PaginationModel<Document[]>> {
    params = !params ? {} : params;
    return new Promise<PaginationModel<Document[]>>(
      (resolve, reject) => {
        if (!params) params = {} as PaginateParamsModel;
        params.page = +params.page || 1;
        params.pageSize = +params.pageSize || 20;

        let queryDocs: mongoose.Query<any> = this as any;

        // verify query where [normal] + [pattern]
        const _where: any = {};
        if (params.where) {
          const whereValues: string[] = params.where.split(';');
          whereValues.forEach((wv: string) => {
            const value: string[] = wv.split(':');
            _where[value[0]] = value[1] || undefined;
          });
        }
        if (params.pattern) {
          const patternValues: string[] = params.pattern.split(';');
          patternValues.forEach((pv: string) => {
            const value: string[] = pv.split(':');
            _where[value[0]] = new RegExp(value[1]) || undefined;
          });
        }
        queryDocs.find(_where);

        // verify query sort - value is [1] or [-1] -----------------------------------------
        if (params.sort) {
          const sort: any = {};
          const sortValues: string[] = params.sort.split(';');
          sortValues.forEach((sv: string) => {
            const value: string[] = sv.split(':');
            sort[value[0]] = +(value[1] || 1);
          });
          queryDocs.sort(sort);
        } else {
          queryDocs.sort({ dateCreated: -1 });
        }

        // verify query select - value is [0] or [1] ---------------------------------------
        if (params.select) {
          const select: any = {};
          const selectValues: string[] = params.select.split(';');
          selectValues.forEach((sv: string) => {
            const value: string[] = sv.split(':');
            select[value[0]] = +(value[1] || 1);
          });
          queryDocs.select(select);
        }

        // verify pageSize
        if (params.pageSize !== -1) {
          queryDocs = queryDocs
            .skip((params.page - 1) * params.pageSize)
            .limit(params.pageSize);
        }
        if (params.populations) {
          const pops: string[] = params.populations.split(';');
          pops.forEach((popEle: string) => {
            const value: string[] = popEle.split(':');
            queryDocs = queryDocs.populate(value[0], value[1]);
          });
        }
        const queryCount = (this as any).model.countDocuments((this as any)._conditions || params.where);
        async.parallel({
          data: (cb: Function) => queryDocs.exec(cb),
          totalItem: (cb: Function) => queryCount.exec(cb)
        }, (err: any, data: any) => {
          if (err) return reject(err);
          let result: PaginationModel<Document[]>;
          if (!err && data) {
            result = <PaginationModel<Document[]>>data;
            result.page = params.page;
            result.pageSize = params.pageSize === -1 ? result.data.length : params.pageSize;
            result.totalPage = Math.ceil(result.totalItem / (result.pageSize || 1));
          }
          resolve(result);
        });
      })
      .nodeify(callback);
  };

export default 'Extend Mongoose/Query';
