import { Injectable } from '@nestjs/common'
import { DataLoaderFactory } from 'dataloader-factory'
import { Meeting } from '../meetings/meetings.models'
import { MeetingsService } from '../meetings/meetings.service'
import { filterAsync } from 'txstate-utils'
import { DataLoadedService } from '../dataloaderfactory/dataloadedservice'
import { getUserAttendances } from './userattendances.database'
import { UserAttendance, UserAttendanceFilters } from './userattendances.models'

DataLoaderFactory.register<string, UserAttendance>('userattendances', {
  fetch: async (ids) => {
    return await getUserAttendances({ ids })
  }
})

DataLoaderFactory.registerOneToMany<string, UserAttendance>('userattendancesByMeeting', {
  fetch: async (meetingIds, filters) => {
    return await getUserAttendances({ meetingIds, ...filters })
  },
  extractKey: ua => ua.meetingId,
  idLoaderKey: 'userattendances'
})

@Injectable()
export class UserAttendancesService extends DataLoadedService {
  async findOneById (id: string) {
    const ua = await this.factory.get<string, UserAttendance>('userattendances').load(id)
    if (!(await this.mayViewUserAttendance(ua))) return undefined
  }

  async find (filters: UserAttendanceFilters) {
    return await this.removeUnauthorized(await getUserAttendances(filters))
  }

  async findByMeeting (meeting: Meeting) {
    return await this.removeUnauthorized(await this.factory.getOneToMany<string, UserAttendance>('userattendancesByMeeting').load(meeting.id))
  }

  /** AUTHORIZATION HELPERS */

  async removeUnauthorized (uas: UserAttendance[]) {
    return await filterAsync(uas, async ua => await this.mayViewUserAttendance(ua))
  }

  async mayViewUserAttendance (ua: UserAttendance) {
    if (this.ctx.user.admin || this.ctx.user.id === ua.userId) return true
    const meetingsService = await this.getService(MeetingsService)
    const meeting = await meetingsService.findOneById(ua.meetingId)
    // get the site
    // check if the user has the proper role in the site
    return true
  }
}
