import { folderRepository } from './folder.repository';
import { itemRepository } from '../item-api/item.repository';

import { ICreateFolder } from './folder.interface';
import { FolderConst } from './folder.const';
import * as _ from 'lodash';

import { BaseError } from '../../libs/error';
import { AppConst, getLanguage } from '../../common/constants';
import * as fs from 'fs'


const repositories = new folderRepository();
const itemRepositories = new itemRepository();


//#region 
export async function create(_requestParams: ICreateFolder) {
  const created = await repositories.create(_requestParams);
  if (!created) throw new BaseError({ message: FolderConst.RESPONSE_ERRORS.ERROR_FOLDER_CREATE_HAS_ERROR });
  return created;
}

export async function getAll() {
  const find = await repositories.find();
  return find;
}

export async function getOne(_id: string) {
  const find = await repositories.findById(_id);
  if (!find) throw new BaseError({ message: FolderConst.RESPONSE_ERRORS.ERROR_FOLDER_NOT_FOUND });
  return find;
}

export async function getAllItemsInFolder(_id: string, queryParam?: string, sortParam?: string) {
  let find
  if(queryParam) {
    find = await itemRepositories.find({ folder: _id, type: queryParam });
  } else if (sortParam) {
    find = await itemRepositories.find({ folder: _id }).sort('type');
  } else {
    find = await itemRepositories.find({ folder: _id });
  }

  return find;
}

export async function editName(_id: string, _requestParams: ICreateFolder) {
  const find = await repositories.updateById(_id, _requestParams);
  if (!find) throw new BaseError({ message: FolderConst.RESPONSE_ERRORS.ERROR_FOLDER_NOT_FOUND });
  return find;
}

export async function softDelete(_id: string) {
  const updated = await repositories.updateById(_id, { 'isDeleted': true });
  if (!updated) throw new BaseError({ message: FolderConst.RESPONSE_ERRORS.ERROR_FOLDER_NOT_FOUND });

  //update items have "isDeleted" = false -> "isDeleted" = true
  const items = await itemRepositories.updateMany({ folder: _id, isDeleted: false }, { isDeleted: true });
  return updated;
}

export async function restore(_id: string) {
  // 1. get dateUpdated of folder
  const folder = await repositories.findById(_id);
  if (!folder) throw new BaseError({ message: FolderConst.RESPONSE_ERRORS.ERROR_FOLDER_NOT_FOUND });

  //2. update items have dateUpdated > dateUpdated of folder
  const items = await itemRepositories.updateMany({ folder: _id, dateUpdated: { $gte: folder.dateUpdated } }, { isDeleted: false });

  // 3. update folder : "isDeleted" = false
  const updated = await repositories.updateById(_id, { 'isDeleted': false });

  return updated;
}

export async function deleteObjById(_id: string) {
  const deleteFolder = await repositories.deleteOne({ _id: _id, isDeleted: true });
  if (deleteFolder.n === 0) throw new BaseError({ message: FolderConst.RESPONSE_ERRORS.ERROR_FOLDER_NOT_FOUND }) // n= deletedCount

  const items = await itemRepositories.find({ folder: _id })
  if (items.length != 0) {
    items.forEach((item) => {
      fs.unlinkSync(`./src/filesUploaded/${item.name}`);
    })
  }

  const deleteItems = await itemRepositories.deleteMany({ folder: _id });
  return deleteFolder;
}