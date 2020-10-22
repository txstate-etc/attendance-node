import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { DataLoaderFactoryContext } from 'src/dataloaderfactory/dataloadedservice'
import { MeetingsService } from 'src/meetings/meetings.service'

@ObjectType()
export class UserAttendance {
  @Field(type => ID)
  id: string

  meetingId: string
  userId: string

  constructor (row: any) {
    this.id = String(row.id)
    this.meetingId = String(row.meeting_id)
    this.userId = String(row.user_id)
  }
}

@InputType()
export class UserAttendanceFilters {
  @Field(type => [String], { nullable: true })
  ids?: string[]

  @Field(type => [String], { nullable: true })
  meetingIds?: string[]
}
