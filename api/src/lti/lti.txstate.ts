import { extractNetIDFromFederated } from 'txstate-utils'
import { LTILaunchParams } from './lti.util'

export function getUsernameFromLaunch (ltiParams: LTILaunchParams) {
  return extractNetIDFromFederated(ltiParams.custom.federatednetid)
}
