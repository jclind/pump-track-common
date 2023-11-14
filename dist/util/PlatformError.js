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
exports.PlatformError = void 0;
// import { Platform } from 'react-native'
// import { toast as reactToast } from 'react-hot-toast'
// import Toast from 'react-native-toast-message'
const __1 = require("..");
const PlatformError = async (error) => {
    try {
        const message = error.message || error;
        console.log(error);
        if (__1.ENVIRONMENT_KEY && __1.ENVIRONMENT_KEY === 'mobile') {
            const { default: Toast } = await Promise.resolve().then(() => __importStar(require('react-native-toast-message')));
            Toast.show({
                type: 'error',
                text1: 'An error occurred',
                text2: 'Please try again',
            });
        }
        else {
            const toast = await Promise.resolve().then(() => __importStar(require('react-hot-toast')));
            toast.default.error(message, { position: 'bottom-center' });
        }
    }
    catch (error) {
        console.error('Error handling platform error:', error);
    }
};
exports.PlatformError = PlatformError;
