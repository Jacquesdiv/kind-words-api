import { IBaseModel } from '../../database/models/base-model';
import { IModelAdaptor } from '../../database/database';

export abstract class CrudService<T extends IBaseModel> {

  constructor(private adaptor: IModelAdaptor<T>) { }

  public async findAll(where?: any): Promise<T[]> {
    return this.adaptor.findAll(where);
  }

  public async findOne(where?: any): Promise<T> {
    return this.adaptor.findOne(where);
  }

  public async findById(id: string): Promise<T> {
    return this.adaptor.findById(id);
  }

  public async findByIds(ids: string[]): Promise<T[]> {
    return this.adaptor.findByIds(ids);
  }

  public create(input: T): Promise<T> {
    return this.adaptor.create(input);
  }

  public async update(input: T): Promise<T> {
    return this.adaptor.update(input);
  }

  public async delete(id: string): Promise<void> {
    return this.adaptor.delete(id);
  }

  public async count(where?: any): Promise<number> {
    return this.adaptor.count(where);
  }

}
