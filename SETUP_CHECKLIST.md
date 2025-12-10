# Setup Checklist

Use this checklist to ensure you've completed all setup steps correctly.

## Pre-Setup

- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] Firebase CLI installed globally (`npm install -g firebase-tools`)
- [ ] Firebase CLI logged in (`firebase login`)

## Project Setup

- [ ] Cloned or downloaded the project repository
- [ ] Navigated to project root directory
- [ ] Installed frontend dependencies (`npm install`)
- [ ] Installed functions dependencies (`cd functions && npm install && cd ..`)

## Firebase Configuration

- [ ] Created `.env` file in project root
- [ ] Added `VITE_FIREBASE_API_KEY` to `.env`
- [ ] Added `VITE_FIREBASE_AUTH_DOMAIN` to `.env`
- [ ] Added `VITE_FIREBASE_PROJECT_ID` to `.env`
- [ ] Added `VITE_FIREBASE_STORAGE_BUCKET` to `.env`
- [ ] Added `VITE_FIREBASE_MESSAGING_SENDER_ID` to `.env`
- [ ] Added `VITE_FIREBASE_APP_ID` to `.env`
- [ ] Verified all values are correct (no placeholders remaining)
- [ ] Confirmed `.env` file is NOT committed to Git

## Firebase Functions Setup

- [ ] Firebase project initialized (`firebase init` or project already configured)
- [ ] Functions folder structure verified
- [ ] Functions dependencies installed
- [ ] (Optional) Service account key obtained and stored securely (outside project)
- [ ] (Optional) `GOOGLE_APPLICATION_CREDENTIALS` environment variable set (if using service account locally)

## Verification

- [ ] Development server starts without errors (`npm run dev`)
- [ ] Application loads in browser at `http://localhost:3000`
- [ ] No Firebase configuration errors in browser console
- [ ] No missing module errors
- [ ] Can navigate through the application

## Security Checklist

- [ ] `.env` file is in `.gitignore` (already configured)
- [ ] No service account keys in project directory
- [ ] No hardcoded credentials in source code
- [ ] All sensitive data uses environment variables

## Deployment Readiness

- [ ] All local tests pass
- [ ] Production build succeeds (`npm run build`)
- [ ] Firebase Functions deploy successfully (`firebase deploy --only functions`)
- [ ] Firebase project has correct permissions configured

## Next Steps

After completing this checklist:

1. Read [SETUP.md](./SETUP.md) for detailed information
2. Review [QUICK_START.md](./QUICK_START.md) for quick reference
3. Start developing your features
4. Follow the project's coding standards and structure

---

**Need Help?** See [SETUP.md](./SETUP.md) troubleshooting section or contact the support team.

