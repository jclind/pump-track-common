"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformError = void 0;
// import { Platform } from 'react-native'
// import { toast as reactToast } from 'react-hot-toast'
// import Toast from 'react-native-toast-message'
const __1 = require("..");
const PlatformError = (error) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = error.message || error;
        console.log(error);
        if (__1.ENVIRONMENT_KEY && __1.ENVIRONMENT_KEY === 'mobile') {
            const { default: Toast } = yield Promise.resolve().then(() => require('react-native-toast-message'));
            Toast.show({
                type: 'error',
                text1: 'An error occurred',
                text2: 'Please try again',
            });
        }
        else {
            const toast = yield Promise.resolve().then(() => require('react-hot-toast'));
            toast.default.error(message, { position: 'bottom-center' });
        }
    }
    catch (error) {
        console.error('Error handling platform error:', error);
    }
});
exports.PlatformError = PlatformError;
