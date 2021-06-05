/// <reference types="mongoose" />
import * as Bluebird from 'bluebird';
import * as mongoose from 'mongoose';
import {PaginateParamsModel, PaginationModel} from '../common/model';

interface Pagination<T> extends PaginationModel<T> {
}

/**
 * @extends
 */
interface QueryHelper<T> {
  /**
   * Extension method helps us paginate the documents in a query
   */
  paginate(params?: PaginateParamsModel, callback?: (err: any, data: Pagination<T>) => void): Bluebird<Pagination<T>>;
}

interface MongooseDocumentHelper {
  validateSync(): mongoose.Error;
}

declare module 'mongoose' {
  interface Query<T> extends QueryHelper<T> {
  }

  interface DocumentQuery<T, DocType extends Document> extends QueryHelper<T> {
  }

  interface MongooseDocument extends MongooseDocumentHelper {
    validateSync(): mongoose.Error;
  }

  interface Document {
    save(options: { validateBeforeSave: boolean }, fn?: (err: any, product: this, numAffected: number) => void): Promise<this>;
  }

  type Promise<T> = Bluebird<T>;
}
