# Quick Start Guide

This is a condensed version of the setup process. For detailed instructions, see [SETUP.md](./SETUP.md).

## Prerequisites Check

```bash
node --version    # Should be v18 or higher
npm --version     # Should be v6 or higher
firebase --version # Should be installed globally
```

## 5-Minute Setup

### 1. Install Dependencies

```bash
npm install
cd functions && npm install && cd ..
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Create `.env` File

Create a `.env` file in the project root with:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

**Get these values from:** Firebase Console → Project Settings → Your apps → Web app

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Firebase Functions
cd functions
npm run deploy           # Deploy Cloud Functions
npm run serve            # Test functions locally
```

## Troubleshooting

**Firebase config errors?**
- Check `.env` file exists and has all `VITE_` prefixed variables
- Restart dev server after creating/updating `.env`

**Port already in use?**
- Server will auto-select next available port
- Or change port in `package.json` scripts

**Functions won't deploy?**
- Run `firebase login` first
- Check you have project permissions in Firebase Console

## Next Steps

- Read [SETUP.md](./SETUP.md) for detailed instructions
- Review [README.md](./README.md) for project overview
- Check Firebase Console for project configuration

---

**⚠️ Remember:** Never commit `.env` files or service account keys!

