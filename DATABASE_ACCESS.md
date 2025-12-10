# Database Access Information

## 🗄️ Database Used

This project uses **Firebase Firestore** (Cloud Firestore) as the primary database.

Firebase Firestore is a **NoSQL document database** provided by Google Firebase. It's a cloud-hosted database that stores data in collections and documents.

---

## 📦 Firebase Services Used

The project uses multiple Firebase services:

### 1. **Cloud Firestore** (Database)
- **Type**: NoSQL Document Database
- **Purpose**: Stores all application data (registrations, blogs, media, speakers, etc.)
- **Location**: Google Cloud Platform (managed by Firebase)

### 2. **Firebase Storage** (File Storage)
- **Type**: Object Storage
- **Purpose**: Stores uploaded files (images, videos, documents)
- **Location**: Google Cloud Storage (managed by Firebase)

### 3. **Firebase Authentication**
- **Type**: Authentication Service
- **Purpose**: User authentication and authorization
- **Location**: Firebase Auth service

### 4. **Firebase Cloud Functions**
- **Type**: Serverless Functions
- **Purpose**: Backend logic (token generation, admin verification)
- **Location**: Google Cloud Functions (managed by Firebase)

---

## 🔑 What Access You Need to Request

You need to request access to the **Firebase Project** from your client. This includes:

### Required Access:

1. **Firebase Console Access**
   - Access to the Firebase project dashboard
   - URL: https://console.firebase.google.com/
   - You need to be added as a **Project Member** or **Owner**

2. **Firestore Database Access**
   - Read/Write access to Firestore collections
   - Ability to view and manage data
   - Access to Firestore security rules

3. **Firebase Storage Access**
   - Access to uploaded files
   - Ability to manage storage buckets

4. **Firebase Authentication Access**
   - Access to user management
   - Ability to view/manage admin users

5. **Cloud Functions Access** (if deploying functions)
   - Ability to deploy and manage Cloud Functions

---

## 📋 Information to Request from Client

Ask your client for the following:

### 1. **Firebase Project Details**
```
- Firebase Project ID: [Ask for this]
- Firebase Project Name: [Ask for this]
- Firebase Console URL: [They can share the project link]
```

### 2. **Access Permissions**
Request one of these roles:
- **Owner** (full access) - Recommended for development
- **Editor** (can modify resources)
- **Viewer** (read-only) - Not recommended for development

### 3. **Firebase Web App Configuration**
Request the Firebase web app configuration values:
```
- API Key
- Auth Domain
- Project ID
- Storage Bucket
- Messaging Sender ID
- App ID
```

These values are found in:
**Firebase Console → Project Settings → Your apps → Web app**

### 4. **Service Account Key** (Optional - for local development)
If you need to run Cloud Functions locally or access Firestore from local scripts:
- Request a **Service Account Key JSON file**
- **IMPORTANT**: This should be shared securely (not via email)
- Store it outside the project folder

---

## 📊 Database Collections Structure

Based on the codebase, here are the Firestore collections used:

1. **`blogs`** - Blog posts
2. **`media`** - Media items (photos, videos)
3. **`speakers`** - Speaker information
4. **`colleges`** - College/university database
5. **`registrations`** - Participant registrations
6. **`contacts`** - Contact form submissions
7. **`admins`** - Admin users
8. **`events`** - Event information
9. **`sponsors`** - Sponsor information
10. **`donors`** - Donor information

---

## 🔐 How to Request Access

### Email Template for Client:

```
Subject: Request for Firebase Project Access - Bhartiya Youth Parliament 2026

Dear [Client Name],

I'm setting up the Bhartiya Youth Parliament 2026 project and need access to the Firebase project.

Please provide:

1. Firebase Project Access:
   - Add me as a project member with Editor/Owner role
   - Firebase Console: https://console.firebase.google.com/
   - Project ID: [Please share]

2. Firebase Web App Configuration:
   - I need the web app configuration values from:
     Firebase Console → Project Settings → Your apps → Web app
   - This includes: API Key, Auth Domain, Project ID, Storage Bucket, 
     Messaging Sender ID, and App ID

3. (Optional) Service Account Key:
   - If I need to run Cloud Functions locally, I'll need a service account key
   - This should be shared securely

Once I have access, I can:
- Configure the project locally
- View and manage database collections
- Deploy updates to Cloud Functions
- Test the application with real data

Thank you!

[Your Name]
```

---

## 🚀 After Getting Access

Once you have Firebase access:

1. **Login to Firebase Console**
   - Go to https://console.firebase.google.com/
   - Select the project

2. **Get Web App Configuration**
   - Project Settings → Your apps → Web app
   - Copy the `firebaseConfig` values

3. **Create `.env` File**
   - Add the configuration values to `.env` file
   - See `SETUP.md` for instructions

4. **Verify Collections**
   - Go to Firestore Database in Firebase Console
   - Verify all collections exist
   - Check data structure

5. **Check Storage**
   - Go to Storage in Firebase Console
   - Verify storage bucket exists

6. **Review Security Rules**
   - Check Firestore security rules
   - Check Storage security rules
   - Ensure they're properly configured

---

## 📝 Important Notes

- **Firestore is a NoSQL database** - Data is stored in collections and documents (not tables and rows)
- **Real-time updates** - Firestore supports real-time data synchronization
- **Scalable** - Automatically scales with your application
- **Security Rules** - Access is controlled by Firestore security rules
- **Backup** - Firebase provides automatic backups (check with client about backup strategy)

---

## 🔍 How to Check Current Database

If you get Firebase Console access, you can:

1. **View Firestore Data:**
   - Firebase Console → Firestore Database
   - See all collections and documents

2. **View Storage Files:**
   - Firebase Console → Storage
   - See all uploaded files

3. **View Users:**
   - Firebase Console → Authentication
   - See all registered users

4. **View Functions:**
   - Firebase Console → Functions
   - See deployed Cloud Functions

---

## ❓ Questions to Ask Client

1. What is the Firebase Project ID?
2. Can you add me as a project member with Editor/Owner role?
3. Do you have the Firebase web app configuration values?
4. Are there any specific security rules I should be aware of?
5. Is there existing data in the database I should be aware of?
6. Are there any backup/restore procedures I should follow?

---

**Summary**: You need **Firebase Project Access** (specifically Firestore, Storage, and Authentication). Request to be added as a project member with Editor or Owner role.

