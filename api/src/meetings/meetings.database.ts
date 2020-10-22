import db from 'mysql2-async/db'
import { DataLoaderFactoryContext } from 'src/dataloaderfactory/dataloadedservice'
import { MeetingFilters, Meeting } from './meetings.models'

export async function getMeetings (filters: MeetingFilters, ctx: DataLoaderFactoryContext) {
  const binds = []
  const where = []
  if (filters.ids?.length) {
    where.push(`id IN (${db.in(binds, filters.ids)})`)
  }
  if (filters.siteIds?.length) {
    where.push(`site_id IN (${db.in(binds, filters.siteIds)})`)
  }
  const meetings = await db.getall(`SELECT * FROM meetings WHERE (${where.join(') AND (')})`, binds)
  return meetings.map(m => new Meeting(m))
}
