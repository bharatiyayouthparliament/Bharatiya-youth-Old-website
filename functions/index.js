// Firebase Cloud Functions Entry Point
// This file exports all Cloud Functions for deployment

import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import admin from "firebase-admin";
import { generateToken } from "./utils/generateToken.js";

// Initialize Firebase Admin SDK
// In production, this uses the default credentials from the Firebase project
// For local development, you may need to set GOOGLE_APPLICATION_CREDENTIALS environment variable
// pointing to a service account key (stored securely outside the project)
if (!admin.apps.length) {
  admin.initializeApp();
}

// Set global options for all functions
setGlobalOptions({
  maxInstances: 10,
  region: "asia-south1", // Adjust to your preferred region
});

/**
 * Verify Admin Token
 * This function verifies if a user has admin privileges
 * 
 * @param {string} token - The authentication token to verify
 * @returns {Object} - User admin status and details
 */
export const verifyAdminToken = onRequest(async (request, response) => {
  // Enable CORS
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (request.method === "OPTIONS") {
    response.status(204).send("");
    return;
  }

  try {
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      response.status(401).json({ 
        error: "Unauthorized", 
        message: "No authorization token provided" 
      });
      return;
    }

    const idToken = authHeader.split("Bearer ")[1];
    
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Check if user exists in admins collection
    const adminDoc = await admin
      .firestore()
      .collection("admins")
      .doc(uid)
      .get();

    if (!adminDoc.exists) {
      response.status(403).json({ 
        error: "Forbidden", 
        message: "User is not an admin" 
      });
      return;
    }

    const adminData = adminDoc.data();
    
    response.status(200).json({
      success: true,
      admin: {
        uid,
        ...adminData,
      },
    });
  } catch (error) {
    console.error("Error verifying admin token:", error);
    response.status(500).json({ 
      error: "Internal Server Error", 
      message: error.message 
    });
  }
});

/**
 * Generate Registration Token
 * This function generates a unique registration token with the specified prefix
 * 
 * @param {string} prefix - The prefix for the token (e.g., "BYPC", "GSR")
 * @returns {Object} - Generated token details
 */
export const generateRegistrationToken = onRequest(async (request, response) => {
  // Enable CORS
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (request.method === "OPTIONS") {
    response.status(204).send("");
    return;
  }

  try {
    // Verify admin token first
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      response.status(401).json({ 
        error: "Unauthorized", 
        message: "No authorization token provided" 
      });
      return;
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Check admin status
    const adminDoc = await admin
      .firestore()
      .collection("admins")
      .doc(uid)
      .get();

    if (!adminDoc.exists) {
      response.status(403).json({ 
        error: "Forbidden", 
        message: "Only admins can generate tokens" 
      });
      return;
    }

    // Get prefix from request body or query
    const prefix = request.body?.prefix || request.query?.prefix;
    
    if (!prefix) {
      response.status(400).json({ 
        error: "Bad Request", 
        message: "Prefix is required" 
      });
      return;
    }

    // Generate token
    const tokenData = await generateToken(prefix);

    // Save token metadata to Firestore
    await admin.firestore().collection("registrations").add({
      tokenPrefix: prefix,
      tokenYear: tokenData.year,
      tokenMonth: tokenData.month,
      tokenSerial: tokenData.serial,
      generatedAt: admin.firestore.FieldValue.serverTimestamp(),
      generatedBy: uid,
    });

    response.status(200).json({
      success: true,
      token: tokenData.token,
      ...tokenData,
    });
  } catch (error) {
    console.error("Error generating registration token:", error);
    response.status(500).json({ 
      error: "Internal Server Error", 
      message: error.message 
    });
  }
});

