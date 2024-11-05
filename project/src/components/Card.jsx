import { PriorityIcon } from './icons';

function Card({ ticket }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="profile-pic">
          {/* Profile picture would go here */}
        </div>
      </div>
      <div className="card-title">
        <h3>{ticket.title}</h3>
      </div>
      <div className="card-tags">
        <div className="tag feature-tag">
          <PriorityIcon priority={ticket.priority} />
          <span>{ticket.tag}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;