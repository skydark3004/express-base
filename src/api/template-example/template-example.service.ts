import { TemplateExampleRepository } from './template-example.repository';
import {
  ICreateTemplateExampleRequest,
  IListTemplateExampleRequest,
  IUpdateTemplateExampleRequest,
  IActionAnyTemplateExampleRequest
} from './template-example.interface';
import { TemplateExampleConst } from './template-example.const';
import * as _ from 'lodash';

import { BaseError } from '../../libs/error';
import { Language } from '../../libs/utils';
import { AppConst, getLanguage } from '../../common/constants';

const repositories = new TemplateExampleRepository();

//#region 
export async function create(_requestParams: ICreateTemplateExampleRequest) {
  let pickData: any = _.omit(_requestParams, ['exampleDataMultiLanguage']);
  pickData.exampleDataMultiLanguage = (new Language(_requestParams.exampleDataMultiLanguage)).convertArrayToObject();
  const created = await repositories.create(pickData);
  if (!created) throw new BaseError({ message: TemplateExampleConst.RESPONSE_ERRORS.ERROR_TEMPLATE_EXAMPLE_CREATE_HAS_ERROR });
  return created;
}
export async function update(_id: string, _requestParams: IUpdateTemplateExampleRequest) {
  const find = await repositories.findById(_id);
  if (!find) throw new BaseError({ message: TemplateExampleConst.RESPONSE_ERRORS.ERROR_TEMPLATE_EXAMPLE_NOT_FOUND });
  let pickData: any = _.omit(_requestParams, ['exampleDataMultiLanguage']);
  if (_requestParams.exampleDataMultiLanguage) {
    let objMultiLang = find.exampleDataMultiLanguage;
    for (const iterator of _requestParams.exampleDataMultiLanguage) {
      if (!Object.keys(objMultiLang).includes(iterator.language)) {
        throw new BaseError({ message: 'Error languages.' });
      }
      objMultiLang[iterator.language] = iterator.content || '';
    }
    pickData.exampleDataMultiLanguage = objMultiLang;
  }
  const updated = await repositories.updateById(find._id, pickData);
  if (!updated) throw new BaseError({ message: TemplateExampleConst.RESPONSE_ERRORS.ERROR_TEMPLATE_EXAMPLE_UPDATE_HAS_ERROR });
  return updated;
}

export async function exampleWithMongooseQuery(_requestParams: IActionAnyTemplateExampleRequest) {
  const find = await repositories.TSchema.find(_requestParams);
  const findOne = await repositories.TSchema.findOne(_requestParams);
  const findById = await repositories.TSchema.findById('_id');
  const findByIdAndDelete = await repositories.TSchema.findByIdAndDelete('_id');
  const findByIdAndRemove = await repositories.TSchema.findByIdAndRemove('_id');
  const findOneAndUpdate = await repositories.TSchema.findOneAndUpdate('_id', _requestParams);
  // const note = await repositories.TSchema.// query any with mongoose command
  return {};
}

export async function getDetailById(_id: string) {
  const find = await repositories.findById(_id);
  if (!find) throw new BaseError({ message: TemplateExampleConst.RESPONSE_ERRORS.ERROR_TEMPLATE_EXAMPLE_NOT_FOUND });
  return find;
}
export async function deleteObjById(_id: string) {
  // const find = await repositories.removeByParams({ _id }); // void function
  const find = await repositories.TSchema.findOneAndRemove(_id); // return object delete
  if (!find) throw new BaseError({ message: TemplateExampleConst.RESPONSE_ERRORS.ERROR_TEMPLATE_EXAMPLE_NOT_FOUND });
  return find;
}
export async function changeStatusActive(_id: string, status: boolean) {
  const find = await repositories.findById(_id);
  if (!find) throw new BaseError({ message: TemplateExampleConst.RESPONSE_ERRORS.ERROR_TEMPLATE_EXAMPLE_NOT_FOUND });
  const updated = await repositories.updateById(find._id, { 'status.isActive': status });
  return updated;
}

export async function getList(_requestParams: IListTemplateExampleRequest) {
  let conditions: any = {
    'status.isDeleted': false,
    // 'status.isActive': true // for client
  };
  if (!_.isEmpty(_requestParams.keySearch)) {
    conditions.$or = [
      { 'keyWannaSearch': new RegExp(`${_requestParams.keySearch}`, 'i') }
    ];
  }
  let populates = [{
    path: 'examplePopulateData', // key populate 
    select: '_id name type' // select ket in collection populate
  }];

  let results = await repositories.findWithPaginateParams({
    conditions,
    populate: populates,
    projections: {
      _id: 1,
      content: 1,
      exampleDataString: 1,
      exampleDataNumber: 1,
      exampleDataBoolean: 1,
      examplePopulateData: 1,
      dateCreated: 1
    }
  });
  let data = results.data.map((item: any) => item.toObject());
  results.data = (new Language(data).switch(getLanguage()));
  return results;
}

//#endregion

//#region PRIVATE
//#endregion