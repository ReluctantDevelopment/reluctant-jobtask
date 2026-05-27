import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faBagShopping,
  faBox,
  faBriefcase,
  faClipboardList,
  faCompass,
  faCrosshairs,
  faGun,
  faHammer,
  faLocationArrow,
  faLocationDot,
  faMap,
  faRoute,
  faSkull,
  faTrash,
  faTruck,
  faWrench,
} from '@fortawesome/free-solid-svg-icons'

const ICONS: Record<string, IconDefinition> = {
  briefcase: faBriefcase,
  truck: faTruck,
  trash: faTrash,
  package: faBox,
  hammer: faHammer,
  wrench: faWrench,
  shopping: faBagShopping,
  clipboard: faClipboardList,
  map: faMap,
  'map-pin': faLocationDot,
  navigation: faLocationArrow,
  compass: faCompass,
  gun: faGun,
  box: faBox,
  route: faRoute,
  skull: faSkull,
  crosshairs: faCrosshairs,
}

const FALLBACK = faBriefcase

export function JobtaskIcon({ name, className }: { name?: string; className?: string }) {
  const icon = (name && ICONS[name]) || FALLBACK
  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      fixedWidth
      aria-hidden
    />
  )
}
