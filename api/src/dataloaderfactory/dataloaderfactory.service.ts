import { Inject, Injectable, Scope } from '@nestjs/common'
import { ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core'
import { DataLoaderFactory } from 'dataloader-factory'
import { DataLoaderFactoryContext } from './dataloadedservice'

@Injectable({ scope: Scope.REQUEST })
export class DataLoaderFactoryService {
  factory: DataLoaderFactory
  ctx: DataLoaderFactoryContext

  constructor (@Inject(REQUEST) private readonly req: any, private readonly moduleRef: ModuleRef) {
    const contextId = ContextIdFactory.getByRequest(req)
    this.ctx = { user: req.user, moduleRef, contextId }
    this.factory = new DataLoaderFactory(this.ctx)
  }
}
