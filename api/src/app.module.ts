import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { LtiModule } from './lti/lti.module'
import { MeetingsModule } from './meetings/meetings.module'
import { UsersModule } from './users/users.module'
import { UserAttendancesModule } from './userattendances/userattendances.module'

@Module({
  imports: [
    LtiModule,
    MeetingsModule,
    UsersModule,
    UserAttendancesModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: { path: join(process.cwd(), 'src/graphql.ts') },
      autoSchemaFile: false,
      sortSchema: true,
      context: ({ req }) => {
        req.user = { netid: 'nw13' }
        return { user: req.user }
      }
    })
  ]
})
export class AppModule {}
