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
  FaRobot 
} from 'react-icons/fa';

const iconMap = {
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
  FaRobot
};

export const getIconComponent = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || FaCode;
};