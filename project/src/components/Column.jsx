import Card from './Card';
import { FaPlus, FaEllipsis } from 'react-icons/fa6';
import { StatusIcon, PriorityIcon } from './icons';

const PRIORITY_MAP = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No Priority'
};

function Column({ title, tickets, grouping }) {
  const getIcon = () => {
    if (grouping === 'status') {
      return <StatusIcon status={title} />;
    } else if (grouping === 'priority') {
      const priorityLevel = Object.entries(PRIORITY_MAP)
        .find(([_, value]) => value === title)?.[0];
      return priorityLevel ? <PriorityIcon priority={Number(priorityLevel)} /> : null;
    }
    return null;
  };

  return (
    <div className="column">
      <div className="column-header">
        <div className="column-title">
          {getIcon()}
          <span>{title}</span>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="column-actions">
          <button><FaPlus /></button>
          <button><FaEllipsis /></button>
        </div>
      </div>
      <div className="cards">
        {tickets.map(ticket => (
          <Card key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

export default Column;