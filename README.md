This document provides all required instructions for any new developer joining the project.
It includes details about what technologies are used, what has been removed for security reasons, and what configuration must be completed before running or deploying the system.

1. Technologies Used

This project is built with:
Frontend
React.js
Vite as the build tool
TailwindCSS for styling
React Router for navigation
Multiple custom UI components (alerts, dialogs, dropdowns, tables, skeleton loaders, etc.)

Backend
Firebase Authentication
Firestore Database
Firebase Storage
Firebase Cloud Functions for admin-level logic and token verification
Other Tools
Environment variable management using .env
Git & GitHub for version control
Firebase CLI for deployments and backend setup

2. Items Removed During Cleanup
The following elements were intentionally removed for security and compliance:
Razorpay Checkout Integration
All Razorpay payment code and references have been removed.
If payments are required later, the new developer must reintegrate Razorpay securely.
Service Account Key File (functions/serviceAccountKey.json)
This file previously contained sensitive credentials and was fully removed from the repository and Git history.
It must never be recreated inside the project folder.
Always generate service keys locally and keep them private.
Firebase Configuration Values
The Firebase initialization file has been cleared to remove all project-specific credentials.
New developers must configure Firebase themselves before the project will run.

3. Developer Requirements Before Running the Project
The new developer must complete the following tasks:

3.1 Create a .env File
Add all Firebase web configuration values into a local environment file.
This file is not included in the repository and must be created manually.
These values can be found in the Firebase Console under Project Settings → Web App.

3.2 Configure Firebase Initialization
Developers must enter the Firebase configuration inside the project's Firebase setup file.
No credentials should ever be hardcoded into the repository.

3.3 Set Up Firebase Cloud Functions
The backend uses Firebase Cloud Functions for actions such as token verification.
Developers must ensure that the Cloud Functions folder includes the required functionality and deploy it using the Firebase CLI.

3.4 Manage Service Account Keys Securely
If a service account key is required for local administrative access:
Generate a new private key from the Firebase Service Accounts section.
Store it securely on your machine.
Do not share it or upload it to GitHub.

4. Development Setup Instructions
New developers must follow these steps:
Install all project dependencies.
Install Firebase CLI globally.
Create the required .env file.
Configure Firebase inside the project.
Set up and deploy Firebase Cloud Functions if backend features are being modified.
Start the local development server using the project's start command.
Follow the current folder and component structure when adding new features.

5. Maintenance & Security Guidelines
Do not upload .env files, private keys, or sensitive data to GitHub.
Ensure all sensitive values are stored in environment variables.
Maintain the modular structure already followed throughout the project.
Document any new functionality, APIs, or environment requirements.
Use proper branching practices when making changes.
Test features locally before pushing to the repository.

6. Support & Contact Information
For any assistance regarding this project or for development queries, please contact:
Cosmo Infomis
Website: www.cosmoinfomis.in
Email : info@cosmoinfomis.in
+91 94535 46327
Email: info@cosmoinfomis.in

Phone: +91 94535 46327
