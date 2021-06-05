import { AppConst } from '../../common/constants';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type TemplateExampleModel = mongoose.Document & {
  examplePopulateData: string,
  exampleDataString: string,
  exampleDataNumber: number,
  exampleDataBoolean: boolean,
  exampleDataMultiLanguage: any,
  status: {
    isActive: boolean;
    isDeleted: boolean;
  };
};

const TemplateExampleSchema = new Schema({
  examplePopulateData: {
    type: Schema.Types.ObjectId,
    ref: 'ExampleOtherModelSchema'
  },
  exampleDataString: {
    type: String,
    required: true,
    unique: false,
    default: 'This is default value template'
  },
  exampleDataNumber: {
    type: Number,
    required: false,
  },
  exampleDataBoolean: {
    type: Boolean,
    default: true
  },
  exampleDataMultiLanguage: {
    type: mongoose.Schema.Types.Mixed,
  },
  status: {
    isActive: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  }
}, AppConst.SCHEMA_OPTIONS);
export const TemplateExampleModels: mongoose.Model<TemplateExampleModel> = mongoose.model<TemplateExampleModel>('TemplateExampleSchema', TemplateExampleSchema);
