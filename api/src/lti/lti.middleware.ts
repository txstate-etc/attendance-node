import { Injectable, NestMiddleware, OnModuleInit } from '@nestjs/common'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Provider as lti } from 'ltijs'
import { getUsernameFromLaunch } from './lti.txstate'
import { CANVAS_LTI_BASE, getLaunchParams } from './lti.util'

@Injectable()
export class LtiMiddleware implements NestMiddleware, OnModuleInit {
  async onModuleInit () {
    if (!process.env.LTI_SECRET) throw new Error('LTI_SECRET environment variable must be set.')
    lti.setup(process.env.LTI_SECRET!, {
      url: `mongodb://${process.env.MONGO_HOST ?? 'mongo'}:${process.env.MONGO_PORT ?? '27017'}/${process.env.MONGO_DATABASE ?? 'default_database'}?authSource=${process.env.MONGO_AUTHDATABASE ?? 'admin'}`,
      connection: {
        user: process.env.MONGO_USER ?? '',
        pass: process.env.MONGO_PASS ?? process.env.MONGO_PASSWORD ?? ''
      }
    }, {
      appRoute: '/',
      invalidTokenRoute: '/invalidtoken',
      sessionTimeoutRoute: '/sessionTimeout',
      keysetRoute: '/keys',
      loginRoute: '/login',
      devMode: process.env.NODE_ENV === 'development',
      tokenMaxAge: 60
    })
    lti.onConnect(async (token, req: Request, res: Response) => {
      if (token) {
        const ltiParams = getLaunchParams(res)
        const jwttoken = jwt.sign({
          ltiUserId: ltiParams.user,
          lmsUserId: ltiParams.custom.userid,
          username: getUsernameFromLaunch(ltiParams)
        }, process.env.LTI_SECRET!)
        await res.header('Set-Cookie', `token=${jwttoken};${(req as any).protocol === 'https' ? ' Secure;' : ''} HttpOnly; Path=/api/graphql; SameSite=Strict;`)
        await res.redirect(`/${ltiParams.context.id}?token=${jwttoken}`)
      } else await res.redirect('/api/nolti')
    })
    await lti.deploy({ serverless: true })
    await lti.registerPlatform({
      url: CANVAS_LTI_BASE,
      name: 'TxState Canvas',
      clientId: process.env.CANVAS_CLIENT_ID ?? '',
      authenticationEndpoint: `${CANVAS_LTI_BASE}/api/lti/authorize_redirect`,
      accesstokenEndpoint: `${CANVAS_LTI_BASE}/login/oauth2/token`,
      authConfig: { method: 'JWK_SET', key: `${CANVAS_LTI_BASE}/api/lti/security/jwks` }
    })
  }

  use (req: Request, res: Response, next: () => void) {
    lti.app(req, res, next)
  }
}
