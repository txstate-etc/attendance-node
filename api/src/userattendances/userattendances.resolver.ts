import { Args, Query, Resolver } from '@nestjs/graphql'
import { filterAsync } from 'txstate-utils'
import { UserAttendance, UserAttendanceFilters } from './userattendances.models'
import { UserAttendancesService } from './userattendances.service'
import { mayViewUserAttendance } from './userattendances.database'

@Resolver(of => UserAttendance)
export class UserAttendancesResolver {
  constructor (private readonly userAttendancesService: UserAttendancesService) {}

  @Query(returns => [UserAttendance])
  async userattendances (@Args('filter') filter: UserAttendanceFilters) {
    const ctx = this.userAttendancesService.ctx
    const uas = await this.userAttendancesService.find(filter)
    return await filterAsync(uas, async ua => await mayViewUserAttendance(ua, ctx))
  }
}
