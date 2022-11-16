import { CrudService } from '../crud/crud.service';
import { ISentence, ISentenceAdaptor } from '../../database/models/sentence';

export class SentenceService extends CrudService<ISentence> {
  constructor(adaptor: ISentenceAdaptor) { super(adaptor); }
}