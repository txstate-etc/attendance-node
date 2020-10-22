import { forwardRef, Module } from '@nestjs/common'
import { DataLoaderFactoryModule } from 'src/dataloaderfactory/dataloaderfactory.module'
import { MeetingsModule } from 'src/meetings/meetings.module'
import { UserAttendancesResolver } from './userattendances.resolver'
import { UserAttendancesService } from './userattendances.service'

@Module({
  imports: [DataLoaderFactoryModule, forwardRef(() => MeetingsModule)],
  providers: [UserAttendancesResolver, UserAttendancesService],
  exports: [UserAttendancesService]
})
export class UserAttendancesModule {}
