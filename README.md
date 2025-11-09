# TicketPro - Offline Ticketing System

A beautiful offline Windows desktop application for managing support tickets with a stunning green color palette.

## Features

- **Offline First**: Works completely offline with local data storage
- **Beautiful UI**: Clean, modern interface with green color palette
- **Ticket Management**: Create, edit, close, and reopen tickets
- **Random Ticket IDs**: Each ticket gets a unique ID (letter + number, e.g., A1001)
- **Categories**: Finance, Inquiry, Complaint, Commercial, Other
- **Customer Data**: Track customer name, email, and detailed descriptions
- **SLA Management**: Editable service level agreements (4-72 hours)
- **Excel Export/Import**: Export tickets to Excel with clear formatting
- **Search & Filter**: Find tickets quickly by ID, name, email, or category
- **Status Management**: Open and close tickets as needed

## Technologies

- **Frontend**: React + Vite
- **Desktop**: Electron (for Windows packaging)
- **Database**: SQLite (offline) / LocalStorage (browser)
- **Excel**: XLSX library for import/export
- **Icons**: Lucide React

## Development (Web Version)

The app runs in the browser during development:

```bash
npx vite --host 0.0.0.0 --port 5000
```

Visit http://localhost:5000

## Building for Windows

To package the app as a Windows installer:

1. Install dependencies:
```bash
npm install
```

2. Build the React app:
```bash
npx vite build
```

3. Package for Windows:
```bash
npx electron-builder --win
```

This will create a Windows installer in the `release` folder.

## Distribution

The Windows installer includes:
- Complete offline functionality
- SQLite database for data storage
- Excel export/import capabilities
- No internet connection required

## Usage

### Creating a Ticket
1. Click "New Ticket" button
2. Select category (Finance, Inquiry, Complaint, Commercial, Other)
3. Enter customer name and email
4. Add description with customer details
5. Set SLA (Service Level Agreement) in hours
6. Click "Create Ticket"

### Editing a Ticket
1. Select ticket from the list
2. Click "Edit" button
3. Modify any field including SLA
4. Click "Save Changes"

### Managing Ticket Status
- Click "Close Ticket" to mark as resolved
- Click "Reopen Ticket" to reactivate closed tickets

### Export to Excel
1. Click "Export" button in the header
2. Excel file downloads with all ticket data
3. Formatted with clear columns and proper widths

### Import from Excel
1. Click "Import" button
2. Select previously exported Excel file
3. Tickets are imported and merged with existing data

## Data Storage

- **Browser Mode**: LocalStorage (development/web)
- **Desktop Mode**: SQLite database in user data folder (Windows)

All data persists locally on your machine - no cloud storage or internet required!

## Color Palette

The app features a beautiful green gradient theme:
- Primary: Green shades from #f0fdf4 to #052e16
- Accent: White backgrounds with green highlights
- Status indicators: Green-based color coding

## License

This is a custom ticketing application built for offline use.
