"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebaseInstance = exports.initializeFirebase = exports.setFirebaseConfig = void 0;
const app_1 = __importDefault(require("firebase/compat/app"));
require("firebase/compat/auth");
const storage_1 = require("firebase/storage");
const firestore_1 = require("firebase/firestore");
const analytics_1 = require("firebase/analytics");
const auth_1 = require("firebase/auth");
const functions_1 = require("firebase/functions");
const PlatformError_1 = require("src/util/PlatformError");
let firebaseConfig = null;
let firebaseInstance = null;
function setFirebaseConfig(config) {
    firebaseConfig = config;
}
exports.setFirebaseConfig = setFirebaseConfig;
function initializeFirebase(config) {
    if (!config) {
        const errorMessage = 'Firebase configuration not set. Call setFirebaseConfig first.';
        console.error(errorMessage);
        (0, PlatformError_1.PlatformError)(errorMessage);
        return null;
    }
    // Initialize Firebase
    const app = app_1.default.initializeApp(config);
    const firebaseFunctions = (0, functions_1.getFunctions)();
    const auth = (0, auth_1.getAuth)(app);
    const storage = (0, storage_1.getStorage)();
    const db = (0, firestore_1.getFirestore)();
    const analytics = (0, analytics_1.getAnalytics)(app);
    firebaseInstance = {
        app,
        firebaseFunctions,
        auth,
        storage,
        db,
        analytics,
    };
    return firebaseInstance;
}
exports.initializeFirebase = initializeFirebase;
function getFirebaseInstance() {
    if (!firebaseInstance) {
        throw (0, PlatformError_1.PlatformError)('Firebase not initialized. Call initializeFirebase first.');
    }
    return firebaseInstance;
}
exports.getFirebaseInstance = getFirebaseInstance;
