import { AppConst } from '../../common/constants/app.const';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type ItemModel = mongoose.Document & {
  name: string,
  folder: string;
  type: string;
  isDeleted: boolean;
  dateCreated: Date;
  dateUpdated: Date
};

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  folder: { type: Schema.Types.ObjectId, required: true, ref: 'FolderSchema' },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, AppConst.SCHEMA_OPTIONS);
export const ItemModels: mongoose.Model<ItemModel> = mongoose.model<ItemModel>('ItemSchema', ItemSchema);
