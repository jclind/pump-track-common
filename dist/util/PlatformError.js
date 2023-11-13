"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformError = void 0;
const react_native_1 = require("react-native");
const react_hot_toast_1 = require("react-hot-toast");
const react_native_toast_message_1 = __importDefault(require("react-native-toast-message"));
// import {Toast as reactNativeToast} from 'react-native-toast-message'
// import Toast from 'react-native-toast-message'
const PlatformError = (error) => {
    const message = error.message || error;
    console.log(error);
    if (react_native_1.Platform.OS === 'ios' || react_native_1.Platform.OS === 'android') {
        react_native_toast_message_1.default.show({ type: 'error', text1: 'Error', text2: message });
    }
    else {
        react_hot_toast_1.toast.error(message, { position: 'bottom-center' });
    }
};
exports.PlatformError = PlatformError;
