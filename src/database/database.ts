import config from '../config/config';

import { ISentenceAdaptor } from './models/sentence';

import { IBaseModel } from './models/base-model';

import { DatabaseMongo } from './mogno/database.mongo';

export enum DatabaseType {
  MONGO = 'MONGO',
}

export enum TableNames {
  SENTENCES = 'sentences',
}

export class Database {

  public static instance(): IDatabase {
    switch (config.databaseType) {
      case DatabaseType.MONGO: return DatabaseMongo.instance();
      default: throw new Error('Invalid Database Type');
    }
  }
}

export interface IDatabase {
  Sentence: ISentenceAdaptor;
  connect(): Promise<void>;
}

export interface IModelAdaptor<T extends IBaseModel> {

  /**
   * Search for multiple instances matching the provided where clause.
   *
   * if no where clause is provided, all instances will be returned
   */
  findAll(where?: any): Promise<T[]>;
  /**
   * Search for a single instance.
   * Returns the first instance found, or null if none can be found.
   */
  findOne(where?: any): Promise<T>;
  /**
   * Search for a single instance by its ID.
   */
  findById(id: string): Promise<T>;
    /**
   * Search for multiple instances by its IDs.
   */
  findByIds(ids: string[]): Promise<T[]>;
  /**
   * Creates a new instance with the provided input data on the database.
   */
  create(input: T): Promise<T>;
  /**
   * Updated the instance in the database which matches the ID in the
   *  provided input data.
   */
  update(input: T): Promise<T>;
  /**
   * Delete the instance from the database corresponding to this id provided.
   */
  delete(id: string): Promise<void>;
  /**
   * Count the number of instances matching the provided where clause.
   */
  count(where?: any): Promise<number>;
}
