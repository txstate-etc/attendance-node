declare module 'ltijs' {
  export interface Provider {
    app: (req: any, res: any, next: () => void) => void
    setup: (
      ltiSecret: string,
      databaseConfig: {
        plugin?: any
        url?: string
        debug?: boolean
        connection?: {
          user: string
          pass?: string
        }
      },
      ltiConfig: {
        appRoute?: string
        loginRoute?: string
        keysetRoute?: string
        invalidTokenRoute?: string
        sessionTimeoutRoute?: string
        cookies?: {
          secure?: boolean
          sameSite?: 'None'|'Lax'|'Strict'
          domain?: string
        }
        devMode?: boolean
        tokenMaxAge?: number
        staticPath?: string
        cors?: boolean
      }
    ) => void

    deploy: (deployConfig: { serverless?: boolean }) => Promise<void>

    whitelist: (...routes: (string | { route: string, method: string })[]) => void

    keysetRoute: () => string

    registerPlatform: (options: {
      url: string
      name: string
      clientId: string
      authenticationEndpoint: string
      accesstokenEndpoint: string
      authConfig: {
        method: string
        key: string
      }
    }) => Promise<void>

    onConnect: (callback: (token: IdToken, req: any, res: any, next?: () => void) => void|Promise<void>) => void

    NamesAndRoles: {
      getMembers: (token: IdToken, options?: { limit?: number, role?: string, pages?: number, url?: string, resourceLinkId?: boolean }) => Promise<{
        id: string
        context: {
          id: string
          label: string
          title: string
        }
        members: [
          {
            status: string
            name: string
            picture: string
            given_name: string
            family_name: string
            middle_name: string
            email: string
            user_id: string
            lis_person_sourcedid: string
            roles: string[]
          }
        ]
        next?: string
      }>
    }
  }

  export interface PlatformInfo {
    family_code: string
    version: string
    name: string
    description: string
  }

  export interface UserInfo {
    given_name: string
    family_name: string
    name: string
    email: string
  }

  export interface IdToken {
    iss: string
    issuerCode: string
    clientId: string
    user: string
    roles: string[]
    userInfo: UserInfo
    platformInfo: PlatformInfo
    endpoint: {
      scope: string[]
      lineItems: string
      lineItem: string
    }
  }

  export var Provider: Provider
}
