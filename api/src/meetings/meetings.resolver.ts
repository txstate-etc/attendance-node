import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UserAttendance } from 'src/userattendances/userattendances.models'
import { UserAttendancesService } from 'src/userattendances/userattendances.service'
import { Meeting, MeetingFilters } from './meetings.models'
import { MeetingsService } from './meetings.service'

@Resolver(of => Meeting)
export class MeetingsResolver {
  constructor (
    private readonly meetingsService: MeetingsService,
    private readonly userAttendancesService: UserAttendancesService
  ) {}

  @Query(returns => [Meeting])
  async meetings (@Args('filter') filter: MeetingFilters) {
    return await this.meetingsService.find(filter)
  }

  @ResolveField(returns => [UserAttendance])
  async userattendances (@Parent() meeting: Meeting) {
    return await this.userAttendancesService.findByMeeting(meeting)
  }
}
