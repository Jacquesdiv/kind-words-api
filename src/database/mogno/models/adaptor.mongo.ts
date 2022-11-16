import {
  model as MongooseModel,
  Document, Model, DocumentDefinition, Schema, SchemaDefinition
} from 'mongoose';

type SchemaDefinitionType = undefined;

import { IModelAdaptor } from '../../database';
import { IBaseModel } from '../../models/base-model';
import { Error400 } from '../../../utils/http-util';

export class BaseModelMongo extends Document implements IBaseModel {
  public readonly id?: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

export class AdaptorMongo<T extends BaseModelMongo> implements IModelAdaptor<T> {

  constructor(private model: Model<T>) { }

  public async findAll(where?: any): Promise<T[]> {
    const records = await this.model.find(where);
    return records.map(x => this.map(x));
  }

  public async findOne(where?: any): Promise<T> {
    return this.map(await this.model.findOne(where));
  }

  public async findById(id: string): Promise<T> {
    return this.map(await this.model.findById(id));
  }

  public async findByIds(ids: string[]): Promise<T[]> {
    return this.findAll({ _id: { $in: ids } });
  }

  public async create(input: T): Promise<T> {
    return this.map(await this.model.create(input));
  }

  public async update(input: T): Promise<T> {
    const element = await this.model.findById(input.id);
    if (!element) { throw new Error400('Invalid Request'); }

    Object.assign(element, input);
    const document = await element.save();
    return this.map(document);
  }

  public async delete(id: string): Promise<void> {
    const element = await this.model.findById(id);
    if (!element) { throw new Error400('Invalid Request'); }

    await element.delete();
  }

  public async count(where?: any): Promise<number> {
    return await this.model.count(where);
  }

  private map(dbObject: any): T {
    if (!dbObject) { return null; }

    const keys = Object.keys(dbObject && dbObject._doc ? dbObject._doc : {});
    const reply: any = {};

    for (const key of keys) {
      if (key === '_id') { reply.id = dbObject.id; }
      if (key.substr(0, 1) !== '_') { reply[key] = dbObject[key]; }
    }

    return reply;
  }
}

export class ModelCreator {
  public static createModel<T extends BaseModelMongo>(
    model: string,
    definition: SchemaDefinition<DocumentDefinition<SchemaDefinitionType>>
  ): Model<T> {
    const schema = new Schema(definition, { timestamps: true });
    return MongooseModel<T>(model, schema);
  }
}
