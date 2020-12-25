import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Meeting {
  @Field(type => ID)
  id: string

  constructor (meetingRow: any) {
    this.id = String(meetingRow.id)
  }
}

@InputType()
export class MeetingFilters {
  @Field(type => [String], { nullable: true })
  ids?: string[]

  @Field(type => [String], { nullable: true })
  siteIds?: string[]
}
