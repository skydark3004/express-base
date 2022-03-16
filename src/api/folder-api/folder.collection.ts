import { AppConst } from '../../common/constants/app.const';

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type FolderModel = mongoose.Document & {
  name: string,
  isDeleted: boolean;
  dateCreated: Date,
  dateUpdated: Date
};

const FolderSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, AppConst.SCHEMA_OPTIONS);
export const FolderModels: mongoose.Model<FolderModel> = mongoose.model<FolderModel>('FolderSchema', FolderSchema);
