import { Provider as lti } from 'ltijs'
import { Controller, Get, Req } from '@nestjs/common'
import { Request, Response } from 'express'
import { NODE_ENV_SUFFIX } from './lti.util'

@Controller('api')
export class LtiController {
  @Get('nolti')
  async nolti (req: Request, res: Response) {
    res.send('There was a problem getting you authenticated with the attendance application. Please contact support.')
  }

  @Get('config')
  async config (@Req() req: Request) {
    return {
      title: 'Attendance' + NODE_ENV_SUFFIX,
      description: 'Tool for taking class attendance.',
      privacy_level: 'public',
      oidc_initiation_url: `${req.protocol}://${req.headers.host ?? 'localhost'}/api/lti/login`,
      target_link_uri: `${req.protocol}://${req.headers.host ?? 'localhost'}/api/lti`,
      scopes: [
        'https://purl.imsglobal.org/spec/lti-ags/scope/lineitem',
        'https://purl.imsglobal.org/spec/lti-ags/scope/lineitem.readonly',
        'https://purl.imsglobal.org/spec/lti-ags/scope/result.readonly',
        'https://purl.imsglobal.org/spec/lti-ags/scope/score',
        'https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly'
      ],
      extensions: [
        {
          tool_id: 'txstate-attendance',
          platform: 'canvas.instructure.com',
          settings: {
            icon_url: `${req.protocol}://${req.headers.host ?? 'localhost'}/static/favicon.png`,
            selection_height: 800,
            selection_width: 800,
            placements: [
              {
                enabled: true,
                placement: 'course_navigation',
                message_type: 'LtiResourceLinkRequest'
              }
            ]
          }
        }
      ],
      public_jwk_url: `${req.protocol}://${req.headers.host ?? 'localhost'}/api/lti/${lti.keysetRoute()}`,
      custom_fields: {
        courseid: '$Canvas.course.id',
        sectionnames: '$com.instructure.User.sectionNames',
        sectionsisids: '$Canvas.course.sectionSisSourceIds',
        userid: '$User.id',
        federatednetid: '$User.username',
        namesortable: '$com.instructure.Person.name_sortable',
        namedisplay: '$Person.name.display',
        userpronouns: '$com.instructure.Person.pronouns',
        lmsroles: '$Canvas.xuser.allRoles'
      }
    }
  }
}
