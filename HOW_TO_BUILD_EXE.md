# How to Build Your Windows .exe File

Your app is now configured to automatically build a Windows installer (.exe) using GitHub Actions!

## Quick Start

### Step 1: Push to GitHub

1. **Create a new GitHub repository** (if you haven't already):
   - Go to [github.com/new](https://github.com/new)
   - Create a new repository (public or private)

2. **Push your code to GitHub**:
   ```bash
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit with Windows build setup"
   
   # Add your GitHub repository as remote
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   
   # Push to GitHub
   git push -u origin main
   ```

### Step 2: Automatic Build

Once you push your code, GitHub Actions will **automatically**:
- Build your frontend with Vite
- Package your app as a Windows installer
- Make the `.exe` file available for download

### Step 3: Download Your .exe

1. Go to your repository on GitHub
2. Click on the **"Actions"** tab at the top
3. Click on the latest workflow run
4. Scroll down to **"Artifacts"**
5. Download **"windows-installer"**
6. Extract the ZIP file to get your `.exe` installer!

## Your .exe File

The installer will be named something like:
- `TicketPro Setup 1.0.0.exe`

**Users can:**
- Double-click the `.exe` to install your app
- Use the app completely offline (no internet needed!)
- Find their data stored in `C:\Users\{Username}\AppData\Roaming\TicketPro\`

## Manual Build (Optional)

If you want to build manually from a Windows computer:

1. **Clone your repository** on a Windows machine
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Build the app**:
   ```bash
   npm run build:win
   ```
4. **Find your .exe** in the `release/` folder

## Releasing New Versions

To create a new release:

1. **Update version** in `package.json`:
   ```json
   {
     "version": "1.1.0"
   }
   ```

2. **Create a git tag**:
   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```

3. **GitHub Actions will automatically**:
   - Build the new version
   - Create a GitHub Release
   - Attach the `.exe` file to the release

Users can then download the latest version from your GitHub Releases page!

## Troubleshooting

### Build Failed on GitHub Actions

- Check the Actions tab for error logs
- Make sure all dependencies are listed in `package.json`
- Verify the build works locally first

### App Won't Install on Windows

- Windows Defender might flag unsigned apps
- Right-click the `.exe` → Properties → Unblock
- Or run as administrator

### Database Issues

- User data is automatically stored in AppData
- Each user has their own separate database
- Data persists across app updates

## Configuration Files

Your app uses these configuration files:

- `.github/workflows/build-windows.yml` - GitHub Actions workflow
- `electron-builder.yml` - Build settings
- `package.json` - Dependencies and scripts

## Need Help?

If the build fails or you need to customize the installer, check:
- The GitHub Actions logs in the Actions tab
- electron-builder documentation
- Make sure `better-sqlite3` is properly installed

---

**That's it!** Your Windows .exe will be ready to download within a few minutes of pushing to GitHub.
