import type { NuiJobtaskPayload } from './nuiTypes'

/** Cycled in the browser when `npm run dev` — same shape as FiveM SendNUIMessage */
export const MOCK_SCENARIOS: NuiJobtaskPayload[] = [
  {
    message: 'info',
    toptext: 'Container Robbery',
    text: 'Find the train',
    icon: 'map',
    current: 0,
    max: 1,
  },
  {
    message: 'info',
    toptext: 'Container Robbery',
    text: 'Find the train',
    icon: 'map',
    current: 1,
    max: 1,
  },
  {
    message: 'info',
    toptext: 'Container Robbery',
    text: 'Eliminate all guards',
    icon: 'gun',
    current: 4,
    max: 12,
  },
  {
    message: 'info',
    toptext: 'Container Robbery',
    text: 'Loot all containers',
    icon: 'box',
    current: 1,
    max: 2,
  },
  {
    message: 'info',
    toptext: 'Container Robbery',
    text: 'Leave the area (320m+)',
    icon: 'route',
    current: 0,
    max: 1,
  },
  {
    message: 'info',
    toptext: 'Mechanic',
    text: 'Repair the vehicle',
    icon: 'wrench',
    current: 50,
    max: 100,
  },
  { message: 'close' },
]
