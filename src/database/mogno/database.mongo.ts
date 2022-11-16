import { connect as MongooseConnect } from 'mongoose';

import config from '../../config/config';

import { IDatabase } from '../database';
import { ISentenceAdaptor } from '../models/sentence';
import { SentenceAdaptor } from './models/sentence';

export class DatabaseMongo implements IDatabase {

  private static _instance: DatabaseMongo;

  public Sentence: ISentenceAdaptor;

  public static instance(): IDatabase {
    if (!this._instance) { this._instance = new DatabaseMongo(); }
    return this._instance;
  }

  public async connect(): Promise<void> {
    try {
      await MongooseConnect(config.databaseUri);
      console.log('Connected to ' + config.databaseUri);

      this.Sentence = new SentenceAdaptor();
    } catch (err) {
      console.error('Error: ', err);
      console.error('Failed to connect to ' + config.databaseUri);
    }
  }
}
