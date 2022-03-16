import { itemRepository } from './item.repository';
import { ICreateItem } from './item.interface';
import { ItemConst } from './item.const';
import * as _ from 'lodash';

import { BaseError } from '../../libs/error';
import * as fs from 'fs'


const repositories = new itemRepository();

//#region 
export async function getAll() {
  const find = await repositories.find();
  return find;
}

export async function create(_requestParams: ICreateItem) {
  const created = await repositories.create(_requestParams);
  if (!created) throw new BaseError({ message: ItemConst.RESPONSE_ERRORS.ERROR_ITEM_CREATE_HAS_ERROR });
  return created;
}

export async function changeStatusActive(_id: string, status: boolean) {
  const find = await repositories.findById(_id);
  if (!find) throw new BaseError({ message: ItemConst.RESPONSE_ERRORS.ERROR_ITEM_NOT_FOUND });
  const updated = await repositories.updateById(find._id, { 'isDeleted': status });
  return updated;
}

// delete one file
export async function deleteObjById(_id: string) {
  const find = await repositories.find({ _id: _id, isDeleted: true });
  if (find.length === 0) throw new BaseError({ message: ItemConst.RESPONSE_ERRORS.ERROR_ITEM_NOT_FOUND })
  fs.unlinkSync(`./src/filesUploaded/${find[0].name}`);
  const deleteFile = await repositories.TSchema.findOneAndRemove(_id); // return object delete */
  return deleteFile;
}
