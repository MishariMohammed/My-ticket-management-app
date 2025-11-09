import React from 'react';
import { Clock, User, Mail } from 'lucide-react';
import './TicketList.css';

function TicketList({ tickets, selectedTicket, onSelectTicket }) {
  const getCategoryColor = (category) => {
    const colors = {
      'finance': 'var(--green-600)',
      'inquiry': 'var(--green-500)',
      'complaint': 'var(--green-700)',
      'commercial': 'var(--green-400)',
      'other': 'var(--green-300)'
    };
    return colors[category.toLowerCase()] || 'var(--green-500)';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (tickets.length === 0) {
    return (
      <div className="ticket-list-empty">
        <p>No tickets found</p>
      </div>
    );
  }

  return (
    <div className="ticket-list">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className={`ticket-item ${selectedTicket?.id === ticket.id ? 'selected' : ''} ${ticket.status}`}
          onClick={() => onSelectTicket(ticket)}
        >
          <div className="ticket-header">
            <span className="ticket-id">{ticket.id}</span>
            <span 
              className="ticket-category"
              style={{ background: getCategoryColor(ticket.category) }}
            >
              {ticket.category}
            </span>
          </div>
          
          <div className="ticket-customer">
            <div className="ticket-info">
              <User size={14} />
              <span>{ticket.customer_name}</span>
            </div>
            <div className="ticket-info">
              <Mail size={14} />
              <span className="email">{ticket.customer_email}</span>
            </div>
          </div>
          
          <div className="ticket-footer">
            <div className="ticket-time">
              <Clock size={14} />
              <span>{formatDate(ticket.created_at)}</span>
            </div>
            <div className={`ticket-status ${ticket.status}`}>
              {ticket.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TicketList;
