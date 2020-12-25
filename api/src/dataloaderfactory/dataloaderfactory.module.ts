import { Module } from '@nestjs/common'
import { DataLoaderFactoryService } from './dataloaderfactory.service'

@Module({
  providers: [DataLoaderFactoryService],
  exports: [DataLoaderFactoryService]
})
export class DataLoaderFactoryModule {}
