import { Inject } from '@nestjs/common'
import { ContextId, ModuleRef } from '@nestjs/core'
import { DataLoaderFactory } from 'dataloader-factory'
import { User } from 'src/users/users.models'
import { DataLoaderFactoryService } from './dataloaderfactory.service'

export class DataLoadedService {
  ctx: DataLoaderFactoryContext
  factory: DataLoaderFactory
  constructor (@Inject('DataLoaderFactoryService') private readonly dlfservice: DataLoaderFactoryService) {
    this.ctx = this.dlfservice.ctx
    this.factory = this.dlfservice.factory
  }
}

export interface DataLoaderFactoryContext {
  user: User
  moduleRef: ModuleRef
  contextId: ContextId
}
