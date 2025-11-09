import React, { useState } from 'react';
import { X, Ticket } from 'lucide-react';
import { createTicket } from '../services/db';
import './TicketForm.css';

function TicketForm({ onClose, onTicketCreated }) {
  const [formData, setFormData] = useState({
    category: 'inquiry',
    customer_name: '',
    customer_email: '',
    description: '',
    sla_hours: 24
  });

  const [errors, setErrors] = useState({});

  const categories = ['Finance', 'Inquiry', 'Complaint', 'Commercial', 'Other'];
  const slaOptions = [4, 8, 12, 24, 48, 72];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'Customer name is required';
    }
    
    if (!formData.customer_email.trim()) {
      newErrors.customer_email = 'Customer email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customer_email)) {
      newErrors.customer_email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await createTicket(formData);
      onTicketCreated();
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Error creating ticket. Please try again.');
    }
  };

  return (
    <div className="ticket-form-container">
      <div className="form-header">
        <div className="form-title">
          <Ticket size={24} />
          <h2>Create New Ticket</h2>
        </div>
        <button className="btn-close" onClick={onClose}>
          <X size={24} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-group">
          <label>Category *</label>
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

        <div className="form-row">
          <div className="form-group">
            <label>Customer Name *</label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              className={`form-control ${errors.customer_name ? 'error' : ''}`}
              placeholder="Enter customer name"
            />
            {errors.customer_name && (
              <span className="error-message">{errors.customer_name}</span>
            )}
          </div>

          <div className="form-group">
            <label>Customer Email *</label>
            <input
              type="email"
              name="customer_email"
              value={formData.customer_email}
              onChange={handleChange}
              className={`form-control ${errors.customer_email ? 'error' : ''}`}
              placeholder="customer@example.com"
            />
            {errors.customer_email && (
              <span className="error-message">{errors.customer_email}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>SLA (Service Level Agreement)</label>
          <select
            name="sla_hours"
            value={formData.sla_hours}
            onChange={handleChange}
            className="form-control"
          >
            {slaOptions.map(hours => (
              <option key={hours} value={hours}>
                {hours} hours ({hours / 24} days)
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter ticket details and customer information..."
            rows="8"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            <Ticket size={20} />
            Create Ticket
          </button>
        </div>
      </form>
    </div>
  );
}

export default TicketForm;
