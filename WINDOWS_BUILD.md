# Building for Windows

## Prerequisites

1. Node.js installed (v18 or higher)
2. All npm dependencies installed

## Step-by-Step Build Process

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Frontend

```bash
npx vite build
```

This creates an optimized production build in the `dist` folder.

### 3. Create electron-builder Configuration

Create `electron-builder.yml` in the root directory:

```yaml
appId: com.ticketing.app
productName: TicketPro
directories:
  output: release
  buildResources: build
files:
  - dist/**/*
  - electron/**/*
  - node_modules/**/*
  - package.json
win:
  target: nsis
  icon: build/icon.ico
```

### 4. Package for Windows

```bash
npx electron-builder --win
```

This creates a Windows installer (`.exe`) in the `release` folder.

## Output

After building, you'll find:
- `release/TicketPro Setup x.x.x.exe` - Windows installer

## Running the Electron App (Development)

To test the Electron version locally:

1. Start Vite dev server:
```bash
npx vite --host 0.0.0.0 --port 5000
```

2. In another terminal, start Electron:
```bash
NODE_ENV=development npx electron electron/main.js
```

## Distribution

Give users the `.exe` installer from the `release` folder. They can:
1. Run the installer
2. Install TicketPro to their Windows machine
3. Use it completely offline - no internet needed!

## Database Location

When packaged for Windows, the SQLite database is stored in:
```
C:\Users\{Username}\AppData\Roaming\TicketPro\tickets.db
```

This ensures user data persists across app updates.

## Troubleshooting

### Build fails with electron-builder error
- Make sure you've run `npx vite build` first
- Check that all dependencies are installed
- Try removing `node_modules` and reinstalling

### App won't start on Windows
- Check Windows Defender/antivirus isn't blocking it
- Run installer as administrator if needed
- Check Event Viewer for error logs

### Database errors
- Ensure better-sqlite3 is properly installed
- The native module should be compiled for Windows during packaging
