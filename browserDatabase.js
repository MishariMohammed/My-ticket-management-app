const STORAGE_KEY = 'ticketing_app_data';
const COUNTER_KEY = 'ticketing_app_counter';

function loadData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveData(tickets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

function getCounter() {
  const counter = localStorage.getItem(COUNTER_KEY);
  return counter ? parseInt(counter) : 1000;
}

function setCounter(value) {
  localStorage.setItem(COUNTER_KEY, value.toString());
}

export function initDB() {
  return true;
}

export function getNextTicketNumber() {
  const current = getCounter();
  const next = current + 1;
  setCounter(next);
  return next;
}

export function generateTicketId() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  const ticketNumber = getNextTicketNumber();
  return `${randomLetter}${ticketNumber}`;
}

export function createTicket(ticketData) {
  const tickets = loadData();
  const ticketId = generateTicketId();
  const ticketNumber = parseInt(ticketId.substring(1));
  
  const newTicket = {
    id: ticketId,
    ticket_number: ticketNumber,
    category: ticketData.category,
    customer_name: ticketData.customer_name,
    customer_email: ticketData.customer_email,
    description: ticketData.description || '',
    sla_hours: ticketData.sla_hours || 24,
    status: 'open',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    closed_at: null
  };
  
  tickets.push(newTicket);
  saveData(tickets);
  return newTicket;
}

export function getAllTickets() {
  return loadData().sort((a, b) => 
    new Date(b.created_at) - new Date(a.created_at)
  );
}

export function getTicketById(id) {
  const tickets = loadData();
  return tickets.find(t => t.id === id);
}

export function updateTicket(id, updates) {
  const tickets = loadData();
  const index = tickets.findIndex(t => t.id === id);
  
  if (index !== -1) {
    tickets[index] = {
      ...tickets[index],
      ...updates,
      id: tickets[index].id,
      ticket_number: tickets[index].ticket_number,
      created_at: tickets[index].created_at,
      updated_at: new Date().toISOString()
    };
    saveData(tickets);
    return tickets[index];
  }
  return null;
}

export function closeTicket(id) {
  return updateTicket(id, {
    status: 'closed',
    closed_at: new Date().toISOString()
  });
}

export function openTicket(id) {
  return updateTicket(id, {
    status: 'open',
    closed_at: null
  });
}

export function deleteTicket(id) {
  const tickets = loadData();
  const filtered = tickets.filter(t => t.id !== id);
  saveData(filtered);
}

export function importTickets(tickets) {
  const existing = loadData();
  const existingIds = new Set(existing.map(t => t.id));
  
  tickets.forEach(ticket => {
    if (!existingIds.has(ticket.id)) {
      existing.push(ticket);
    } else {
      const index = existing.findIndex(t => t.id === ticket.id);
      if (index !== -1) {
        existing[index] = ticket;
      }
    }
  });
  
  saveData(existing);
}
