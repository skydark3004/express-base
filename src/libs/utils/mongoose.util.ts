import * as mongoose from 'mongoose';
import * as validator from 'validator';

export class MongooseUtil {
  public validateModel(doc?: any, modelInfo?: string | mongoose.Model<mongoose.Document>): Error {
    let Model: mongoose.Model<mongoose.Document>;
    let modelInstance: mongoose.Document;
    if (!doc && !modelInfo) {
      modelInstance = this as any;
    } else {
      if ('string' === typeof modelInfo) {
        Model = mongoose.connection.model(modelInfo);
      } else {
        Model = <mongoose.Model<mongoose.Document>>modelInfo;
      }
      modelInstance = new Model(doc);
    }
    return modelInstance.validateSync();
  }
}
