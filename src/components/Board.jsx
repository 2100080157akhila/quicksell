import { useMemo } from 'react';
import Column from './Column';
import { 
  groupByStatus, 
  groupByUser, 
  groupByPriority,
  sortTickets
} from '../utils/dataUtils';

function Board({ tickets, users, grouping, sorting }) {
  const groupedTickets = useMemo(() => {
    let grouped;
    switch (grouping) {
      case 'user':
        grouped = groupByUser(tickets, users);
        break;
      case 'priority':
        grouped = groupByPriority(tickets);
        break;
      default:
        grouped = groupByStatus(tickets);
    }

    // Sort tickets within each group
    Object.keys(grouped).forEach(key => {
      grouped[key] = sortTickets(grouped[key], sorting);
    });

    return grouped;
  }, [tickets, users, grouping, sorting]);

  return (
    <div className="board">
      {Object.entries(groupedTickets).map(([key, tickets]) => (
        <Column 
          key={key} 
          title={key} 
          tickets={tickets}
          grouping={grouping}
        />
      ))}
    </div>
  );
}

export default Board;