import { ItemModel, ItemModels } from './item.collection';
import { OperationRepository } from '../../libs/common/database/operation.repository';

export class itemRepository extends OperationRepository<ItemModel> {
  constructor() {
    super(ItemModels);
  }

  find(query?: any) {
    return ItemModels.find(query);
  }

  deleteMany(query: any) {
    return ItemModels.deleteMany(query);
  }

  updateMany(filter: any, update: any) {
    return ItemModels.updateMany(filter, update);
  }

  // you can defined any special function for this collection
}