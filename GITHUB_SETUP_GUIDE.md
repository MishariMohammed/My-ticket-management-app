# Complete GitHub Setup Guide (Step-by-Step)

Follow these steps to get your Windows .exe file. No GitHub experience needed!

---

## Part 1: Create a GitHub Account (5 minutes)

1. **Go to GitHub.com**
   - Open your web browser
   - Visit: https://github.com

2. **Sign Up**
   - Click the "Sign up" button (top right)
   - Enter your email address
   - Create a password
   - Choose a username
   - Verify you're not a robot
   - Click "Create account"

3. **Verify Your Email**
   - Check your email inbox
   - Click the verification link GitHub sent you

---

## Part 2: Create a New Repository (3 minutes)

1. **Go to Create New Repository**
   - Visit: https://github.com/new
   - (Or click the "+" icon in top right → "New repository")

2. **Fill in Repository Details**
   - **Repository name**: `ticketpro-app` (or any name you like, no spaces)
   - **Description**: (optional) "My ticket management app"
   - **Public or Private**: Choose "Public" (free builds) or "Private" (if you prefer)
   - **DON'T** check any boxes (no README, no .gitignore, nothing)
   - Click the green **"Create repository"** button

3. **Copy Your Repository URL**
   - You'll see a page with setup instructions
   - Look for a URL like: `https://github.com/YOUR_USERNAME/ticketpro-app.git`
   - **Keep this page open!** You'll need this URL in the next step

---

## Part 3: Connect Replit to GitHub (5 minutes)

Now we'll connect your Replit project to GitHub.

### Open Replit Shell

1. In your Replit project, look for the **Shell** tab at the bottom
2. Click on it to open the command line

### Run These Commands (Copy and Paste)

**Step 1: Tell Git who you are**
```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```
(Replace with YOUR actual email and name)

**Step 2: Initialize Git**
```bash
git init
```
You should see: `Initialized empty Git repository`

**Step 3: Add all your files**
```bash
git add .
```
(That's "git add" followed by a period/dot)

**Step 4: Create your first commit**
```bash
git commit -m "Initial commit - TicketPro app"
```

**Step 5: Connect to your GitHub repository**
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```
⚠️ **IMPORTANT**: Replace with the URL you copied in Part 2!

**Step 6: Rename branch to main**
```bash
git branch -M main
```

**Step 7: Push your code to GitHub**
```bash
git push -u origin main
```

You might be asked for:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (see below if this happens)

### If Asked for a Password

GitHub doesn't accept regular passwords anymore. You need a "Personal Access Token":

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Replit Upload"
4. Check the box: **"repo"** (this gives it permission to upload code)
5. Scroll down and click "Generate token"
6. **COPY THE TOKEN** (you'll only see it once!)
7. Use this token as your password when pushing

---

## Part 4: Watch GitHub Build Your .exe (5-10 minutes)

### Find Your Build

1. **Go to your repository**
   - Visit: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`

2. **Click the "Actions" tab**
   - It's at the top of the page, next to "Code"

3. **See the build in progress**
   - You should see "Build Windows Installer" running
   - It has a yellow/orange circle (building) or green checkmark (done)
   - This takes about 5-10 minutes

4. **Wait for the green checkmark** ✅
   - Refresh the page if it doesn't update automatically

### Download Your .exe

1. **Click on the completed build**
   - Click the workflow run with the green checkmark

2. **Scroll to the bottom**
   - Look for a section called "Artifacts"

3. **Click "windows-installer"**
   - This downloads a ZIP file

4. **Extract the ZIP**
   - Open the downloaded ZIP file
   - Inside you'll find: **TicketPro Setup 1.0.0.exe**

5. **Your .exe is ready!** 🎉
   - You can now install it on any Windows computer
   - Share it with anyone you want!

---

## Troubleshooting

### "Permission denied" when pushing
- You need to create a Personal Access Token (see "If Asked for a Password" above)
- Use the token instead of your password

### Build failed on GitHub
- Go to Actions tab
- Click the failed build
- Look for red error messages
- Feel free to ask me for help!

### Can't find the Shell in Replit
- Look at the bottom of the Replit window
- You should see tabs like "Console", "Shell"
- Click "Shell"

---

## Next Time You Make Changes

After you update your app and want a new .exe:

```bash
git add .
git commit -m "Updated app"
git push
```

GitHub will automatically build a new .exe for you!

---

## Summary

✅ **Create GitHub account**  
✅ **Create new repository**  
✅ **Connect Replit to GitHub**  
✅ **Push your code**  
✅ **Download your .exe from Actions → Artifacts**

That's it! Your Windows installer will be ready to download.
