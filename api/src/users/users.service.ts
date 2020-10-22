import { Injectable } from '@nestjs/common'
import { DataLoaderFactory } from 'dataloader-factory'
import { DataLoadedService } from '../dataloaderfactory/dataloadedservice'
import { User, UserFilters } from './users.models'
import { getUsers } from './users.database'

DataLoaderFactory.register<string, User>('users', {
  fetch: async (ids, ctx) => {
    return await getUsers({ ids }, ctx)
  }
})

@Injectable()
export class UsersService extends DataLoadedService {
  async findOneById (id: string) {
    return await this.factory.get<string, User>('users').load(id)
  }

  async find (filters: UserFilters) {
    return await getUsers(filters, this.ctx)
  }
}
