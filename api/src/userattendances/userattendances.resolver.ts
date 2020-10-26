import { Args, Query, Resolver } from '@nestjs/graphql'
import { UserAttendance, UserAttendanceFilters } from './userattendances.models'
import { UserAttendancesService } from './userattendances.service'

@Resolver(of => UserAttendance)
export class UserAttendancesResolver {
  constructor (
    private readonly userAttendancesService: UserAttendancesService
  ) {}

  @Query(returns => [UserAttendance])
  async userattendances (@Args('filter') filter: UserAttendanceFilters) {
    return await this.userAttendancesService.find(filter)
  }
}
