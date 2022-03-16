import { FolderModel, FolderModels } from './folder.collection';
import { OperationRepository } from '../../libs/common/database/operation.repository';

export class folderRepository extends OperationRepository<FolderModel> {
  constructor() {
    super(FolderModels);
  }

  find(query?:any) {
    return FolderModels.find(query);
  }

  deleteOne(query: any) {
    return FolderModels.deleteOne(query);
  }

  // you can defined any special function for this collection
}