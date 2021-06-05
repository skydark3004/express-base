import { TemplateExampleModel, TemplateExampleModels } from './template-example.collection';
import { OperationRepository } from '../../libs/common/database/operation.repository';

export class TemplateExampleRepository extends OperationRepository<TemplateExampleModel> {
  constructor() {
    super(TemplateExampleModels);
  }

  // you can defined any special function for this collection
}