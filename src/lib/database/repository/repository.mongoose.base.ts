import { Model } from 'mongoose';
import { MongooseDocumentBase } from '../documents/document.mongoose.base';
import { UnitOfWorkMongoose } from '../unit-of-work/unit-of-work.mongoose';
import {
  ModelKeys,
  ModelProjectionType,
} from './types';

export abstract class RepositoryMongooseBase<
  T extends MongooseDocumentBase,
  UnitOfWork extends UnitOfWorkMongoose,
> {
  constructor(
    protected readonly uow: UnitOfWork,
    protected readonly sessionId?: string,
  ) {}

  protected readonly model: Model<T>;

  async create(input: ModelKeys<T>): Promise<T> {
    const session = await this.uow.getSession(this.sessionId);

    const entity = await this.model.create([input], { session })[0];

    return entity;
  }

  async findOneAndUpdate(
    conditions: ModelKeys<T>,
    input: ModelKeys<T>,
  ): Promise<T> {
    const session = await this.uow.getSession(this.sessionId);

    const entity = await this.model.findOneAndUpdate(conditions, input, {
      session,
    });

    return entity;
  }

  async findOne(
    conditions: ModelKeys<T>,
    select?: ModelProjectionType<T> | string,
  ): Promise<T> {
    const session = await this.uow.getSession(this.sessionId);

    const entity = await this.model
      .findOne(conditions, select, { session })
      .exec();

    return entity;
  }

  async findAll(
    conditions?: ModelKeys<T>,
    select?: ModelProjectionType<T> | string,
  ): Promise<T[]> {
    const session = await this.uow.getSession(this.sessionId);

    return this.model.find(conditions, select, { session }).exec();
  }

  async findByIdAndDelete(id: string): Promise<T> {
    const session = await this.uow.getSession(this.sessionId);

    const result = await this.model.findByIdAndDelete(id, { session });

    return result;
  }

  async exists(conditions: ModelKeys<T>): Promise<boolean> {
    const result = await this.model.exists(conditions);

    return Boolean(result?._id);
  }
}
