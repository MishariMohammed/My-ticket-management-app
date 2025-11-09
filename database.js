import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

let db = null;
let dbPathPromise = null;

async function getDbPath() {
  if (typeof window !== 'undefined' && window.electronAPI) {
    try {
      const userDataPath = await window.electronAPI.getDbPath();
      if (!fs.existsSync(userDataPath)) {
        fs.mkdirSync(userDataPath, { recursive: true });
      }
      return path.join(userDataPath, 'tickets.db');
    } catch (error) {
      console.error('Error getting Electron user data path:', error);
    }
  }
  
  const dbDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  return path.join(dbDir, 'tickets.db');
}

export async function initDB() {
  if (db) return db;
  
  try {
    if (!dbPathPromise) {
      dbPathPromise = getDbPath();
    }
    const dbPath = await dbPathPromise;
    console.log('Initializing database at:', dbPath);
    db = new Database(dbPath);
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS tickets (
        id TEXT PRIMARY KEY,
        ticket_number INTEGER UNIQUE,
        category TEXT NOT NULL,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        description TEXT,
        sla_hours INTEGER DEFAULT 24,
        status TEXT DEFAULT 'open',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        closed_at TEXT
      )
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
      )
    `);

    const counterCheck = db.prepare('SELECT value FROM settings WHERE key = ?').get('ticket_counter');
    if (!counterCheck) {
      db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('ticket_counter', '1000');
    }

    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

export async function getNextTicketNumber() {
  await initDB();
  const result = db.prepare('SELECT value FROM settings WHERE key = ?').get('ticket_counter');
  const nextNumber = parseInt(result.value) + 1;
  db.prepare('UPDATE settings SET value = ? WHERE key = ?').run(nextNumber.toString(), 'ticket_counter');
  return nextNumber;
}

export async function generateTicketId() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  const ticketNumber = await getNextTicketNumber();
  return `${randomLetter}${ticketNumber}`;
}

export async function createTicket(ticketData) {
  await initDB();
  const ticketId = await generateTicketId();
  const ticketNumber = parseInt(ticketId.substring(1));
  
  const stmt = db.prepare(`
    INSERT INTO tickets (id, ticket_number, category, customer_name, customer_email, description, sla_hours, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(
    ticketId,
    ticketNumber,
    ticketData.category,
    ticketData.customer_name,
    ticketData.customer_email,
    ticketData.description || '',
    ticketData.sla_hours || 24,
    'open'
  );
  
  return getTicketById(ticketId);
}

export async function getAllTickets() {
  await initDB();
  const stmt = db.prepare('SELECT * FROM tickets ORDER BY created_at DESC');
  return stmt.all();
}

export async function getTicketById(id) {
  await initDB();
  const stmt = db.prepare('SELECT * FROM tickets WHERE id = ?');
  return stmt.get(id);
}

export async function updateTicket(id, updates) {
  await initDB();
  const fields = [];
  const values = [];
  
  Object.keys(updates).forEach(key => {
    if (key !== 'id' && key !== 'ticket_number' && key !== 'created_at') {
      fields.push(`${key} = ?`);
      values.push(updates[key]);
    }
  });
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const stmt = db.prepare(`UPDATE tickets SET ${fields.join(', ')} WHERE id = ?`);
  stmt.run(...values);
  
  return getTicketById(id);
}

export async function closeTicket(id) {
  await initDB();
  const stmt = db.prepare(`
    UPDATE tickets 
    SET status = 'closed', closed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `);
  stmt.run(id);
  return getTicketById(id);
}

export async function openTicket(id) {
  await initDB();
  const stmt = db.prepare(`
    UPDATE tickets 
    SET status = 'open', closed_at = NULL, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `);
  stmt.run(id);
  return getTicketById(id);
}

export async function deleteTicket(id) {
  await initDB();
  const stmt = db.prepare('DELETE FROM tickets WHERE id = ?');
  stmt.run(id);
}

export async function importTickets(tickets) {
  await initDB();
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO tickets 
    (id, ticket_number, category, customer_name, customer_email, description, sla_hours, status, created_at, updated_at, closed_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  tickets.forEach(ticket => {
    stmt.run(
      ticket.id,
      ticket.ticket_number,
      ticket.category,
      ticket.customer_name,
      ticket.customer_email,
      ticket.description,
      ticket.sla_hours,
      ticket.status,
      ticket.created_at,
      ticket.updated_at,
      ticket.closed_at
    );
  });
}
