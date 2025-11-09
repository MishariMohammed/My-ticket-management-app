import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import TicketDetail from './components/TicketDetail';
import Header from './components/Header';
import { getAllTickets, initDB } from './services/db';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const init = async () => {
      await initDB();
      await loadTickets();
    };
    init();
  }, []);

  const loadTickets = async () => {
    const allTickets = await getAllTickets();
    setTickets(allTickets);
  };

  const handleTicketCreated = async () => {
    await loadTickets();
    setShowForm(false);
  };

  const handleTicketUpdated = async () => {
    await loadTickets();
    if (selectedTicket) {
      const updatedTickets = await getAllTickets();
      const updated = updatedTickets.find(t => t.id === selectedTicket.id);
      setSelectedTicket(updated);
    }
  };

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
    setShowForm(false);
  };

  const handleCloseDetail = () => {
    setSelectedTicket(null);
  };

  const handleNewTicket = () => {
    setShowForm(true);
    setSelectedTicket(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesFilter = filter === 'all' || ticket.status === filter;
    const matchesSearch = 
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="app">
      <Header 
        onNewTicket={handleNewTicket}
        onRefresh={loadTickets}
        filter={filter}
        onFilterChange={setFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <div className="main-content">
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Tickets</h2>
            <button className="btn-new-ticket" onClick={handleNewTicket}>
              <Plus size={20} />
              New Ticket
            </button>
          </div>
          <TicketList 
            tickets={filteredTickets}
            selectedTicket={selectedTicket}
            onSelectTicket={handleTicketSelect}
          />
        </div>
        
        <div className="content-area">
          {showForm && (
            <TicketForm 
              onClose={handleCloseForm}
              onTicketCreated={handleTicketCreated}
            />
          )}
          
          {selectedTicket && !showForm && (
            <TicketDetail 
              ticket={selectedTicket}
              onClose={handleCloseDetail}
              onUpdate={handleTicketUpdated}
            />
          )}
          
          {!showForm && !selectedTicket && (
            <div className="welcome-screen">
              <div className="welcome-content">
                <h1>Welcome to TicketPro</h1>
                <p>Select a ticket from the list or create a new one to get started</p>
                <button className="btn-primary" onClick={handleNewTicket}>
                  <Plus size={24} />
                  Create Your First Ticket
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
