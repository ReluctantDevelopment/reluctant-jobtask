export type NuiJobtaskPayload =
  | {
      message: 'info'
      toptext?: string
      text?: string
      icon?: string
      current?: number
      max?: number
    }
  | { message: 'close' }

export function isJobtaskNuiMessage(data: unknown): data is NuiJobtaskPayload {
  if (!data || typeof data !== 'object') return false
  const m = (data as { message?: unknown }).message
  return m === 'info' || m === 'close'
}
