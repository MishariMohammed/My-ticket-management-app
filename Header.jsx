import React from 'react';
import { FileDown, FileUp, RefreshCw, Search, Filter } from 'lucide-react';
import * as XLSX from 'xlsx';
import { getAllTickets, importTickets } from '../services/db';
import './Header.css';

function Header({ onNewTicket, onRefresh, filter, onFilterChange, searchTerm, onSearchChange }) {
  const handleExport = async () => {
    const tickets = await getAllTickets();
    
    const exportData = tickets.map(ticket => ({
      'Ticket ID': ticket.id,
      'Ticket Number': ticket.ticket_number,
      'Category': ticket.category,
      'Customer Name': ticket.customer_name,
      'Customer Email': ticket.customer_email,
      'Description': ticket.description,
      'SLA (hours)': ticket.sla_hours,
      'Status': ticket.status,
      'Created At': ticket.created_at,
      'Created At (Readable)': new Date(ticket.created_at).toLocaleString(),
      'Updated At': ticket.updated_at,
      'Updated At (Readable)': new Date(ticket.updated_at).toLocaleString(),
      'Closed At': ticket.closed_at || '',
      'Closed At (Readable)': ticket.closed_at ? new Date(ticket.closed_at).toLocaleString() : ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    
    worksheet['!cols'] = [
      { width: 12 },
      { width: 15 },
      { width: 15 },
      { width: 25 },
      { width: 30 },
      { width: 40 },
      { width: 12 },
      { width: 12 },
      { width: 25 },
      { width: 22 },
      { width: 25 },
      { width: 22 },
      { width: 25 },
      { width: 22 }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tickets');
    
    const fileName = `tickets_export_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const tickets = jsonData.map(row => {
          const parseDate = (dateStr) => {
            if (!dateStr) return null;
            const parsed = new Date(dateStr);
            return isNaN(parsed.getTime()) ? null : parsed.toISOString();
          };

          return {
            id: row['Ticket ID'],
            ticket_number: row['Ticket Number'],
            category: row['Category'],
            customer_name: row['Customer Name'],
            customer_email: row['Customer Email'],
            description: row['Description'] || '',
            sla_hours: row['SLA (hours)'] || 24,
            status: row['Status'] || 'open',
            created_at: parseDate(row['Created At']) || new Date().toISOString(),
            updated_at: parseDate(row['Updated At']) || new Date().toISOString(),
            closed_at: parseDate(row['Closed At'])
          };
        });

        await importTickets(tickets);
        onRefresh();
        alert(`Successfully imported ${tickets.length} tickets!`);
      } catch (error) {
        console.error('Import error:', error);
        alert('Error importing file. Please check the file format.');
      }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="app-title">TicketPro</h1>
        <p className="app-subtitle">Offline Ticketing System</p>
      </div>
      
      <div className="header-center">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="filter-box">
          <Filter size={20} />
          <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
            <option value="all">All Tickets</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
      
      <div className="header-right">
        <button className="btn-icon" onClick={onRefresh} title="Refresh">
          <RefreshCw size={20} />
        </button>
        
        <button className="btn-icon" onClick={handleExport} title="Export to Excel">
          <FileDown size={20} />
          Export
        </button>
        
        <label className="btn-icon" title="Import from Excel">
          <FileUp size={20} />
          Import
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </header>
  );
}

export default Header;
