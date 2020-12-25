import { Response } from 'express'
import { IdToken } from 'ltijs'

export function getToken (res: Response): IdToken|undefined {
  return (res as any).locals?.token
}
export interface LTILaunchParams {
  user: string
  context: {
    id: string
    title: string
    type: string[]
  }
  custom: {
    courseid: string
    sectionnames: string[]
    sectionsisids: string
    userid: string
    federatednetid: string
    namesortable: string
    namedisplay: string
    userpronouns: string
    lmsroles: string[]
  }
}
export function getLaunchParams (res: Response): LTILaunchParams {
  const ret = (res as any).locals?.context
  ret.custom.lmsroles = ret.custom?.lmsroles?.split(',')
  return ret
}

export const CANVAS_LTI_BASE = `https://canvas.${process.env.NODE_ENV === 'production' ? '' : 'test.'}instructure.com`
const NODE_ENV_SUFFIXES: Record<string, string> = {
  development: ' Dev',
  staging: ' Qual'
}
export const NODE_ENV_SUFFIX = NODE_ENV_SUFFIXES[process.env.NODE_ENV!] ?? ''
