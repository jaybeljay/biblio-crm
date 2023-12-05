import { InjectConnection } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import mongoose, { ClientSession, Connection } from 'mongoose';
import { ConnectionName } from 'src/infra/database/connections';

export abstract class UnitOfWorkMongoose {
  protected sessions: Map<string, ClientSession> = new Map<
    string,
    ClientSession
  >();

  constructor(@InjectConnection(ConnectionName.BASE) private connection: Connection) {}

  async startSession(): Promise<string> {
    const id = randomUUID();
    console.log(id)
    // const conn = await mongoose.connect(`${process.env.MONGODB_URI}`, {
    //   dbName: process.env.MONGODB_NAME,
    // })
    const session = await this.connection.startSession();
    console.log(session)
    this.sessions.set(id, session);
    return id;
  }

  async getSession(id: string): Promise<ClientSession> {
    const session = this.sessions.get(id);

    if (!session) {
      throw new Error('Session not found');
    }

    return session;
  }

  async commit(id: string): Promise<void> {
    const session = await this.getSession(id);
    await session.commitTransaction();
  }

  async rollback(id: string): Promise<void> {
    const session = await this.getSession(id);
    await session.abortTransaction();
  }

  async endSession(id: string): Promise<void> {
    const session = await this.getSession(id);
    await session.endSession();
    this.removeSession(id);
  }

  removeSession(id: string) {
    this.sessions.delete(id);
  }

  async runInTransaction<Result>(
    sessionId: string,
    callback: () => Promise<Result>,
  ) {
    const session = await this.getSession(sessionId);

    session.startTransaction();

    try {
      const result = await callback();

      await this.commit(sessionId);

      return result;
    } catch (error) {
      await this.rollback(sessionId);

      throw error;
    } finally {
      await this.endSession(sessionId);
    }
  }
}
