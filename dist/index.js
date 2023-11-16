"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthState = exports.ENVIRONMENT_KEY = void 0;
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
var useAuthState_1 = require("./hooks/useAuthState");
Object.defineProperty(exports, "useAuthState", { enumerable: true, get: function () { return useAuthState_1.useAuthState; } });
// export * as PlatformError from './util/PlatformError'
