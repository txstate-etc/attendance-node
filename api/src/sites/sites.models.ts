import { Site } from 'src/graphql'

export interface ISite extends Site {
  assignment_id?: number
  context_id: number
  context_label?: string
  context_name?: string
  is_canvas: boolean
  lms_id?: number
  outcomes_url?: string
  points_url?: string
  roster_fetched_at?: Date
  update_in_progress?: Date
}

export function rowToSite (row: any): ISite {
  return {
    ...row,
    name: row.context_label
  }
}
