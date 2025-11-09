const isBrowser = typeof window !== 'undefined' && !window.require;

let dbModule;

if (isBrowser) {
  dbModule = await import('./browserDatabase.js');
} else {
  dbModule = await import('./database.js');
}

export const {
  initDB,
  getNextTicketNumber,
  generateTicketId,
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  closeTicket,
  openTicket,
  deleteTicket,
  importTickets
} = dbModule;
