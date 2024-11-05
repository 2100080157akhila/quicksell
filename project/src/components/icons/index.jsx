import { FaCircle } from 'react-icons/fa6';

export const PriorityIcon = ({ priority }) => {
  const getColor = () => {
    switch (priority) {
      case 4: return '#FC7840';
      case 3: return '#F8B76B';
      case 2: return '#73C2B9';
      case 1: return '#95A4FC';
      default: return '#6B6F76';
    }
  };

  return <FaCircle style={{ color: getColor() }} />;
};

export const StatusIcon = ({ status }) => {
  const getColor = () => {
    switch (status.toLowerCase()) {
      case 'done': return '#5BB85B';
      case 'in progress': return '#F1CA4B';
      case 'todo': return '#E5E5E5';
      case 'backlog': return '#A0A0A0';
      default: return '#6B6F76';
    }
  };

  return <FaCircle style={{ color: getColor() }} />;
};