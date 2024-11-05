import { useState, useEffect } from 'react';
import Column from './components/Column';
import { FaChevronDown } from 'react-icons/fa6';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority');

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const groupTickets = () => {
    if (grouping === 'status') {
      const groups = {};
      tickets.forEach(ticket => {
        if (!groups[ticket.status]) {
          groups[ticket.status] = [];
        }
        groups[ticket.status].push(ticket);
      });
      return groups;
    } else if (grouping === 'user') {
      const groups = {};
      tickets.forEach(ticket => {
        const user = users.find(u => u.id === ticket.userId);
        const userName = user ? user.name : 'Unassigned';
        if (!groups[userName]) {
          groups[userName] = [];
        }
        groups[userName].push(ticket);
      });
      return groups;
    } else {
      const priorityNames = {
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No Priority'
      };
      const groups = {};
      tickets.forEach(ticket => {
        const priority = priorityNames[ticket.priority];
        if (!groups[priority]) {
          groups[priority] = [];
        }
        groups[priority].push(ticket);
      });
      return groups;
    }
  };

  const sortTickets = (ticketGroup) => {
    return Object.entries(ticketGroup).reduce((acc, [key, tickets]) => {
      acc[key] = [...tickets].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
      return acc;
    }, {});
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const groupedAndSortedTickets = sortTickets(groupTickets());

  return (
    <div className="app">
      <header className="header">
        <button className="display-button" onClick={() => setShowMenu(!showMenu)}>
          <span>Display</span>
          <FaChevronDown />
        </button>
        
        {showMenu && (
          <div className="dropdown-menu">
            <div className="menu-item">
              <span>Grouping</span>
              <select 
                value={grouping} 
                onChange={(e) => setGrouping(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="menu-item">
              <span>Ordering</span>
              <select 
                value={sorting} 
                onChange={(e) => setSorting(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </header>

      <main className="board">
        {Object.entries(groupedAndSortedTickets).map(([title, tickets]) => (
          <Column 
            key={title} 
            title={title} 
            tickets={tickets}
            grouping={grouping}
          />
        ))}
      </main>
    </div>
  );
}

export default App;