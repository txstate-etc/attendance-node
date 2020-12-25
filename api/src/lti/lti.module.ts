import { MiddlewareConsumer, Module } from '@nestjs/common'
import { LtiController } from './lti.controller'
import { LtiMiddleware } from './lti.middleware'

@Module({
  controllers: [LtiController]
})
export class LtiModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(LtiMiddleware)
      .forRoutes('api/lti')
  }
}
