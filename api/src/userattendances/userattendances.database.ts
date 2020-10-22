import db from 'mysql2-async/db'
import { DataLoaderFactoryContext } from '../dataloaderfactory/dataloadedservice'
import { MeetingsService } from '../meetings/meetings.service'
import { UserAttendance, UserAttendanceFilters } from './userattendances.models'

export async function getUserAttendances (filters: UserAttendanceFilters, ctx: DataLoaderFactoryContext) {
  const binds = []
  const where = []
  if (filters.ids?.length) {
    where.push(`id IN (${db.in(binds, filters.ids)})`)
  }
  if (filters.meetingIds?.length) {
    where.push(`meeting_id IN (${db.in(binds, filters.meetingIds)})`)
  }
  if (!where.length) throw new Error('Tried to fetch on userattendances table with no filters, that is too much data to retrieve.')
  const userattendances = await db.getall(`SELECT * FROM userattendances WHERE (${where.join(') AND (')})`, binds)
  return userattendances.map(ua => new UserAttendance(ua))
}

export async function mayViewUserAttendance (ua: UserAttendance, ctx: DataLoaderFactoryContext) {
  if (ctx.user.admin || ctx.user.id === ua.userId) return true
  const meetingsService = await ctx.moduleRef.resolve(MeetingsService, ctx.contextId, { strict: false })
  const meeting = await meetingsService.findOneById(ua.meetingId)
  // get the site
  // check if the user has the proper role in the site
  return true
}
