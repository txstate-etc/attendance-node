import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(type => ID)
  id: string

  @Field()
  admin: boolean

  constructor (userRow: any) {
    this.id = String(userRow.id)
  }
}

@InputType()
export class UserFilters {
  @Field(type => [String])
  ids: string[]
}
