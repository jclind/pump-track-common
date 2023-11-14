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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformError = exports.pumpTrackSetup = exports.ENVIRONMENT_KEY = exports.firestore = exports.tracker = void 0;
const firestore_1 = require("./services/firestore");
// export * as auth from './services/auth'
exports.tracker = __importStar(require("./services/tracker"));
exports.firestore = __importStar(require("./services/firestore"));
exports.ENVIRONMENT_KEY = null;
const pumpTrackSetup = (firebaseConfig, environmentKey) => {
    (0, firestore_1.setFirebaseConfig)(firebaseConfig);
    exports.ENVIRONMENT_KEY = environmentKey;
};
exports.pumpTrackSetup = pumpTrackSetup;
// export * as useAuthState from './hooks/useAuthState'
exports.PlatformError = __importStar(require("./util/PlatformError"));
