import { Injectable } from '@nestjs/common'
import { DataLoaderFactory } from 'dataloader-factory'
import { Meeting } from 'src/meetings/meetings.models'
import { DataLoadedService, DataLoaderFactoryContext } from '../dataloaderfactory/dataloadedservice'
import { getUserAttendances } from './userattendances.database'
import { UserAttendance, UserAttendanceFilters } from './userattendances.models'

DataLoaderFactory.register<string, UserAttendance, DataLoaderFactoryContext>('userattendances', {
  fetch: async (ids, ctx) => {
    return await getUserAttendances({ ids }, ctx)
  }
})

DataLoaderFactory.registerOneToMany<string, UserAttendance, DataLoaderFactoryContext>('userattendancesByMeeting', {
  fetch: async (meetingIds, filters, ctx) => {
    return await getUserAttendances({ meetingIds }, ctx)
  },
  extractKey: ua => ua.meetingId,
  idLoaderKey: 'userattendances'
})

@Injectable()
export class UserAttendancesService extends DataLoadedService {
  async findOneById (id: string) {
    return await this.factory.get<string, UserAttendance>('userattendances').load(id)
  }

  async find (filters: UserAttendanceFilters) {
    return await getUserAttendances(filters, this.ctx)
  }

  async findByMeeting (meeting: Meeting) {
    return await this.factory.getOneToMany<string, UserAttendance>('userattendancesByMeeting').load(meeting.id)
  }
}
