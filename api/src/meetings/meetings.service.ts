import { Injectable } from '@nestjs/common'
import { DataLoaderFactory } from 'dataloader-factory'
import { DataLoadedService } from '../dataloaderfactory/dataloadedservice'
import { getMeetings } from './meetings.database'
import { Meeting, MeetingFilters } from './meetings.models'

DataLoaderFactory.register<string, Meeting>('meetings', {
  fetch: async (ids) => {
    return await getMeetings({ ids })
  }
})

@Injectable()
export class MeetingsService extends DataLoadedService {
  async findOneById (id: string) {
    return await this.factory.get<string, Meeting>('meetings').load(id)
  }

  async find (filters: MeetingFilters) {
    return await getMeetings(filters)
  }
}
