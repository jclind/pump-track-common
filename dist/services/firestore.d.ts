import 'firebase/compat/auth';
import { FirebaseConfig, FirebaseInstance } from 'src/types';
export declare function setFirebaseConfig(config: FirebaseConfig): void;
export declare function initializeFirebase(config: FirebaseConfig): FirebaseInstance | null;
export declare function getFirebaseInstance(): FirebaseInstance;
