import { ENVIRONMENT_KEY_TYPE, FirebaseConfig, FirebaseInstance } from './types';
export * as tracker from './services/tracker';
export * as firestore from './services/firestore';
export declare let ENVIRONMENT_KEY: ENVIRONMENT_KEY_TYPE;
export declare const pumpTrackSetup: (firebaseConfig: FirebaseConfig, environmentKey: ENVIRONMENT_KEY_TYPE) => Promise<FirebaseInstance>;
export * as useAuthState from './hooks/useAuthState';
export * as PlatformError from './util/PlatformError';
