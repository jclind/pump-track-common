"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENVIRONMENT_KEY = void 0;
// // export * as auth from './services/auth'
// export * as tracker from './services/tracker'
// export * as firestore from './services/firestore'
exports.ENVIRONMENT_KEY = null;
// export const pumpTrackSetup = async (
//   firebaseConfig: FirebaseConfig,
//   environmentKey: ENVIRONMENT_KEY_TYPE
// ): Promise<FirebaseInstance> => {
//   const firebaseInstance: FirebaseInstance | null =
//     initializeFirebase(firebaseConfig)
//   if (firebaseInstance !== null) {
//     ENVIRONMENT_KEY = environmentKey
//     return firebaseInstance
//   } else {
//     throw new Error(
//       'Firebase: something went wrong, make sure to initialize the app correctly'
//     )
//   }
// }
__exportStar(require("./hooks/useAuthState"), exports);
// export * as PlatformError from './util/PlatformError'
