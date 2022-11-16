import { IModelAdaptor } from '../database';
import { IBaseModel } from './base-model';

export interface ISentence extends IBaseModel {
  sentence: string;
}

export interface ISentenceAdaptor extends IModelAdaptor<ISentence> { }
