import { Inject, Injectable, Scope, Type } from '@nestjs/common'
import { ContextId, ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core'
import { DataLoaderFactory } from 'dataloader-factory'
import { User } from '../users/users.models'

export class DataLoaderFactoryContext {
  constructor (public user: User, public moduleRef: ModuleRef, public contextId: ContextId) {}
  async getService<TInput> (type: Type<TInput>) {
    return await this.moduleRef.resolve(type, this.contextId, { strict: false })
  }
}

@Injectable({ scope: Scope.REQUEST })
export class DataLoaderFactoryService {
  factory: DataLoaderFactory
  ctx: DataLoaderFactoryContext

  constructor (@Inject(REQUEST) private readonly req: any, private readonly moduleRef: ModuleRef) {
    const contextId = ContextIdFactory.getByRequest(req)
    this.ctx = new DataLoaderFactoryContext(req.user, moduleRef, contextId)
    this.factory = new DataLoaderFactory(this.ctx)
  }
}
