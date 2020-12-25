import { forwardRef, Module } from '@nestjs/common'
import { DataLoaderFactoryModule } from 'src/dataloaderfactory/dataloaderfactory.module'
import { UserAttendancesModule } from 'src/userattendances/userattendances.module'
import { MeetingsResolver } from './meetings.resolver'
import { MeetingsService } from './meetings.service'

@Module({
  imports: [DataLoaderFactoryModule, forwardRef(() => UserAttendancesModule)],
  providers: [MeetingsResolver, MeetingsService],
  exports: [MeetingsService]
})
export class MeetingsModule {}
