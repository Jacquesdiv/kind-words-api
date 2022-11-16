import { TableNames } from '../../database';
import { ISentence, ISentenceAdaptor } from '../../models/sentence';
import { BaseModelMongo, AdaptorMongo, ModelCreator } from './adaptor.mongo';

export class Sentence extends BaseModelMongo implements ISentence {
  sentence: string;
}

export class SentenceAdaptor extends AdaptorMongo<Sentence> implements ISentenceAdaptor {
  constructor() {

    const schema = {
      sentence: { type: String },
    };

    const table = TableNames.SENTENCES;
    const model = ModelCreator.createModel<Sentence>(table, schema);
    super(model);
  }
}
