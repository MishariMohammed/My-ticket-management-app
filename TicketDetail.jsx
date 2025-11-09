import React, { useState } from 'react';
import { X, Edit2, Save, XCircle, CheckCircle, Clock, User, Mail, Tag, Calendar } from 'lucide-react';
import { updateTicket, closeTicket, openTicket } from '../services/db';
import './TicketDetail.css';

function TicketDetail({ ticket, onClose, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    category: ticket.category,
    customer_name: ticket.customer_name,
    customer_email: ticket.customer_email,
    description: ticket.description || '',
    sla_hours: ticket.sla_hours
  });

  const categories = ['Finance', 'Inquiry', 'Complaint', 'Commercial', 'Other'];
  const slaOptions = [4, 8, 12, 24, 48, 72];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await updateTicket(ticket.id, formData);
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating ticket:', error);
      alert('Error updating ticket. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({
      category: ticket.category,
      customer_name: ticket.customer_name,
      customer_email: ticket.customer_email,
      description: ticket.description || '',
      sla_hours: ticket.sla_hours
    });
    setIsEditing(false);
  };

  const handleToggleStatus = async () => {
    try {
      if (ticket.status === 'open') {
        await closeTicket(ticket.id);
      } else {
        await openTicket(ticket.id);
      }
      onUpdate();
    } catch (error) {
      console.error('Error toggling ticket status:', error);
      alert('Error updating ticket status. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

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

  return (
    <div className="ticket-detail-container">
      <div className="detail-header">
        <div className="detail-title">
          <h2>Ticket {ticket.id}</h2>
          <span 
            className="detail-category"
            style={{ background: getCategoryColor(ticket.category) }}
          >
            {ticket.category}
          </span>
          <span className={`detail-status ${ticket.status}`}>
            {ticket.status}
          </span>
        </div>
        <div className="detail-actions">
          {!isEditing && (
            <>
              <button 
                className={`btn-action ${ticket.status === 'open' ? 'close' : 'open'}`}
                onClick={handleToggleStatus}
              >
                {ticket.status === 'open' ? (
                  <>
                    <XCircle size={18} />
                    Close Ticket
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    Reopen Ticket
                  </>
                )}
              </button>
              <button className="btn-action edit" onClick={() => setIsEditing(true)}>
                <Edit2 size={18} />
                Edit
              </button>
            </>
          )}
          <button className="btn-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="info-section">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">
                <Tag size={16} />
                Ticket Number
              </div>
              <div className="info-value">{ticket.ticket_number}</div>
            </div>

            <div className="info-item">
              <div className="info-label">
                <Clock size={16} />
                SLA (Hours)
              </div>
              {isEditing ? (
                <select
                  name="sla_hours"
                  value={formData.sla_hours}
                  onChange={handleChange}
                  className="form-control-inline"
                >
                  {slaOptions.map(hours => (
                    <option key={hours} value={hours}>
                      {hours} hours ({hours / 24} days)
                    </option>
                  ))}
                </select>
              ) : (
                <div className="info-value">{ticket.sla_hours} hours</div>
              )}
            </div>

            <div className="info-item">
              <div className="info-label">
                <Calendar size={16} />
                Created
              </div>
              <div className="info-value">{formatDate(ticket.created_at)}</div>
            </div>

            <div className="info-item">
              <div className="info-label">
                <Calendar size={16} />
                Updated
              </div>
              <div className="info-value">{formatDate(ticket.updated_at)}</div>
            </div>
          </div>
        </div>

        <div className="customer-section">
          <h3>Customer Information</h3>
          
          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-control"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Customer Email</label>
                <input
                  type="email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="10"
                />
              </div>

              <div className="edit-actions">
                <button className="btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn-save" onClick={handleSave}>
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="customer-info">
              <div className="customer-row">
                <User size={18} />
                <div>
                  <div className="label">Name</div>
                  <div className="value">{ticket.customer_name}</div>
                </div>
              </div>

              <div className="customer-row">
                <Mail size={18} />
                <div>
                  <div className="label">Email</div>
                  <div className="value">{ticket.customer_email}</div>
                </div>
              </div>

              <div className="description-section">
                <h4>Description</h4>
                <div className="description-content">
                  {ticket.description || 'No description provided'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;
