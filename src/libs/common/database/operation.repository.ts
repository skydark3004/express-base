import * as mongoose from 'mongoose';

interface IOperationRepository {
  create(params: any): any;
  update(_paramsCondition: any, doc: any): any;
  updateById(id: string, params: any): any;
  findById(id: string): any;
  findByParams(params: any): any[];
  findOneByParams(params: any): any;
  findWithPaginateParams(params: { conditions?: any, projections?: any, paginate?: any, populate: any[] }): any;
  removeByParams(params: any): void;
}

export class OperationRepository<TModel extends mongoose.Document> implements IOperationRepository {
  public TSchema: mongoose.Model<TModel>;

  constructor(_TSchema: mongoose.Model<TModel>) {
    this.TSchema = _TSchema;
  }
  create(params: any) {
    return (new this.TSchema(params)).save();
  }
  update(_paramsCondition: any, doc: any) {
    return this.TSchema
      .update(_paramsCondition, doc);
  }
  updateById(id: string, params: any) {
    return this.TSchema
      .findByIdAndUpdate(
        id,
        params,
        Object.assign(params || {}, { new: true })
      )
      .exec();
  }
  removeByParams(params: any): void {
    this.TSchema.findOneAndRemove(params).exec();
  }
  findById(id: string, projections?: any, populate?: [{ path: string, select?: string }]) {
    const obj = this.TSchema
      .findById(id, projections || {});
    if (populate) {
      obj.populate(populate);
    }
    return obj.exec();
  }
  findOneByParams(params: { conditions?: any, projections?: any, populate?: [{ path: string, select?: string }] }) {
    const obj = this.TSchema.findOne(params.conditions || {}, params.projections || {});
    if (params.populate) {
      obj.populate(params.populate);
    }
    return obj.exec();
  }

  findByParams(params: { conditions?: any, projections?: any, populate?: [{ path: string, select?: string }] }): any {
    return this.TSchema
      .find(params.conditions || {}, params.projections || {})
      .exec();
  }
  findWithPaginateParams(params: { conditions?: any, projections?: any, paginate?: any, populate?: any[] }): any {
    const obj = this.TSchema.find(params.conditions || {}, params.projections || {});
    if (params.populate) {
      obj.populate(params.populate);
    }
    return obj.paginate(params.paginate || {});
  }
}