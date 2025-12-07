import admin from "firebase-admin";

export async function generateToken(prefix) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const collectionName = "registrations";

  const snapshot = await admin
    .firestore()
    .collection(collectionName)
    .where("tokenPrefix", "==", prefix)
    .where("tokenYear", "==", year)
    .where("tokenMonth", "==", month)
    .orderBy("tokenSerial", "desc")
    .limit(1)
    .get();

  let lastSerial = 0;

  if (!snapshot.empty) {
    lastSerial = snapshot.docs[0].data().tokenSerial;
  }

  const newSerial = lastSerial + 1;

  const serialFormatted = String(newSerial).padStart(3, "0");

  const finalToken = `${prefix}/${year}/${month}/${serialFormatted}`;

  return {
    token: finalToken,
    year,
    month,
    serial: newSerial,
  };
}
