# Project Setup Guide

This guide will walk you through setting up the Bhartiya Youth Parliament 2026 project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- **Firebase CLI** - Install globally: `npm install -g firebase-tools`

## Step-by-Step Setup Instructions

### Step 1: Install Project Dependencies

Navigate to the project root directory and install all dependencies:

```bash
npm install
```

This will install all frontend dependencies listed in `package.json`.

### Step 2: Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

Verify installation:
```bash
firebase --version
```

### Step 3: Login to Firebase

```bash
firebase login
```

This will open a browser window for you to authenticate with your Google account.

### Step 4: Create Environment Variables File

1. In the project root directory, create a new file named `.env`
2. Add the following content with your Firebase project credentials:

```env
# Firebase Web App Configuration
# Get these values from Firebase Console → Project Settings → Your apps → Web app

VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

#### How to Get Firebase Configuration Values:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click the gear icon ⚙️ next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. If you don't have a web app, click "Add app" → Web (</>) icon
7. Copy the configuration values from the `firebaseConfig` object
8. Replace the placeholder values in your `.env` file

**Important:** 
- The `.env` file is already in `.gitignore` and will NOT be committed to the repository
- Never share your `.env` file or commit it to version control
- The `VITE_` prefix is required for Vite to expose these variables to the frontend

### Step 5: Set Up Firebase Cloud Functions

1. Navigate to the functions directory:
```bash
cd functions
```

2. Install function dependencies:
```bash
npm install
```

3. Return to the project root:
```bash
cd ..
```

4. Initialize Firebase project (if not already done):
```bash
firebase init
```

When prompted:
- Select "Functions" (use spacebar to select, Enter to confirm)
- Choose "Use an existing project" and select your Firebase project
- Select JavaScript as the language
- Accept default options for other prompts

5. Deploy Cloud Functions (when ready):
```bash
firebase deploy --only functions
```

### Step 6: Service Account Key (Optional - Only if needed for local admin access)

**⚠️ SECURITY WARNING:** Service account keys contain sensitive credentials. Handle them with extreme care.

If you need a service account key for local development:

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. **DO NOT** save it in the project folder
5. Store it securely on your machine (outside the project directory)
6. If your code needs it, reference it via an environment variable pointing to the file path

**Never commit service account keys to Git!**

### Step 7: Start the Development Server

From the project root directory:

```bash
npm run dev
```

The application should now be running at `http://localhost:3000` (or the port specified in your terminal).

## Verification Checklist

After setup, verify the following:

- [ ] All npm dependencies are installed
- [ ] Firebase CLI is installed and you're logged in
- [ ] `.env` file exists with all Firebase configuration values
- [ ] Firebase initialization in `src/firebase.js` is working (check browser console for errors)
- [ ] Development server starts without errors
- [ ] You can access the application in your browser

## Troubleshooting

### Firebase Configuration Errors

If you see errors about missing Firebase configuration:

1. Verify your `.env` file exists in the project root
2. Check that all environment variables start with `VITE_`
3. Restart the development server after creating/updating `.env`
4. Ensure there are no typos in variable names

### Port Already in Use

If port 3000 is already in use:

- The server will automatically try the next available port
- Or modify the port in `package.json` scripts

### Firebase Functions Deployment Issues

- Ensure you're logged in: `firebase login`
- Verify your project is selected: `firebase use <project-id>`
- Check that you have the necessary permissions in Firebase Console

### Module Not Found Errors

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- If issues persist, try `npm cache clean --force` then reinstall

## Project Structure

```
Bhartiya-Youth-Parliament-2026/
├── public/              # Static assets
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── firebase.js     # Firebase configuration
│   └── main.jsx        # Application entry point
├── functions/          # Firebase Cloud Functions
├── .env               # Environment variables (create this)
├── .gitignore         # Git ignore rules
├── firebase.json      # Firebase configuration
├── package.json       # Project dependencies
└── vite.config.js     # Vite configuration
```

## Development Workflow

1. **Create a feature branch**: `git checkout -b feature/your-feature-name`
2. **Make your changes**
3. **Test locally**: `npm run dev`
4. **Commit changes**: `git commit -m "Description of changes"`
5. **Push to repository**: `git push origin feature/your-feature-name`
6. **Create a pull request** on GitHub

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build:

```bash
npm run preview
```

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## Support

For assistance, contact:
- **Cosmo Infomis**
- Website: www.cosmoinfomis.in
- Email: info@cosmoinfomis.in
- Phone: +91 94535 46327

---

**Remember:** Never commit sensitive data, `.env` files, or service account keys to the repository!

