const isElectron = () => {
  if (typeof window === 'undefined') return false;
  
  return (window.electronAPI && window.electronAPI.isElectron) ||
         (typeof process !== 'undefined' && 
          process?.type === 'renderer' && 
          process?.versions?.electron);
};

let dbModule;

if (isElectron()) {
  dbModule = await import('./database.js');
} else {
  dbModule = await import('./browserDatabase.js');
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
