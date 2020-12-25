import { Args, Query, Resolver } from '@nestjs/graphql'
import { User, UserFilters } from './users.models'
import { UsersService } from './users.service'

@Resolver(of => User)
export class UsersResolver {
  constructor (
    private readonly usersService: UsersService
  ) {}

  @Query(returns => [User])
  async users (@Args('filter') filter: UserFilters) {
    return await this.usersService.find(filter)
  }
}
