import { Inject, Type } from '@nestjs/common'
import { DataLoaderFactory } from 'dataloader-factory'
import { DataLoaderFactoryContext, DataLoaderFactoryService } from './dataloaderfactory.service'

export class DataLoadedService {
  ctx: DataLoaderFactoryContext
  factory: DataLoaderFactory
  constructor (@Inject('DataLoaderFactoryService') private readonly dlfservice: DataLoaderFactoryService) {
    this.ctx = this.dlfservice.ctx
    this.factory = this.dlfservice.factory
  }

  async getService<TInput> (type: Type<TInput>) {
    return await this.ctx.getService(type)
  }
}
