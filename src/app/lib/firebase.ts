import {cert, getApps} from "firebase-admin/app"
import "server-only"
import {initializeApp} from "firebase-admin";
// import {getStorage} from "firebase-admin/storage";
import {getFirestore} from "firebase-admin/firestore";

if (!process.env.FIREBASE_PRIVATE_KEY_BASE64)
    throw new Error(
        "Missing FIREBASE_PRIVATE_KEY_BASE64 environment variable. Please add it to your .env.local file."
    )

const decodedKey = Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE64, "base64").toString("utf-8");

const firebaseCert = cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: decodedKey,
});

    if(!getApps().length) {
        initializeApp({
            credential: firebaseCert,
            // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        })
    }

export const db = getFirestore();
// export const storage = getStorage().bucket();