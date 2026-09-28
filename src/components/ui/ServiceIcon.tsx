import { IconType } from 'react-icons';
import {
  FaCode,
  FaBrain,
  FaRocket,
  FaGlobe,
  FaShoppingCart,
  FaEdit,
  FaCogs,
  FaTachometerAlt,
  FaBuilding,
  FaCloud,
  FaEye,
  FaComments,
  FaRobot,
} from 'react-icons/fa';
import SignalArc from './SignalArc';

// Service.services[].icon stores a Font Awesome component name (docs/BACKEND.md §8.9).
// This is the ONLY place react-icons should be used in redesigned components.
const iconMap: Record<string, IconType> = {
  FaCode,
  FaBrain,
  FaRocket,
  FaGlobe,
  FaShoppingCart,
  FaEdit,
  FaCogs,
  FaTachometerAlt,
  FaBuilding,
  FaCloud,
  FaEye,
  FaComments,
  FaRobot,
};

export interface ServiceIconProps {
  /** Icon name as stored in the API, e.g. "FaBrain". */
  name?: string;
  size?: number;
  className?: string;
}

/** Resolves a stored icon name; falls back to a neutral SignalArc when it doesn't resolve. */
const ServiceIcon = ({ name, size = 24, className }: ServiceIconProps) => {
  const Icon = name ? iconMap[name] : undefined;
  if (!Icon) {
    return <SignalArc size={size} arcs={3} color="terracotta" className={className} />;
  }
  return <Icon size={size} className={className} aria-hidden="true" focusable="false" />;
};

export default ServiceIcon;
