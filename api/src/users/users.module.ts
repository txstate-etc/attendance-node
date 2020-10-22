import { Module } from '@nestjs/common'
import { DataLoaderFactoryModule } from 'src/dataloaderfactory/dataloaderfactory.module'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [DataLoaderFactoryModule],
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}
