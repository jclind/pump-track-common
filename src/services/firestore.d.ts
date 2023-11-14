import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { FirebaseStorage } from 'firebase/storage';
import { Firestore } from 'firebase/firestore';
import { Analytics } from 'firebase/analytics';
import { Auth } from 'firebase/auth';
import { Functions } from 'firebase/functions';
type FirebaseConfig = {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
};
type FirebaseInstance = {
    app: firebase.app.App;
    firebaseFunctions: Functions;
    auth: Auth;
    storage: FirebaseStorage;
    db: Firestore;
    analytics: Analytics;
};
export declare function setFirebaseConfig(config: FirebaseConfig): void;
export declare function initializeFirebase(): any;
export declare function getFirebaseInstance(): FirebaseInstance;
export {};
