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
exports.updateUserActivity = exports.getUIDFromUsername = exports.getUsername = exports.getUserData = exports.updateUsername = exports.checkUsernameExists = exports.addUsername = exports.logout = exports.signupWithGoogle = void 0;
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const PUMP_TRACK_LS_1 = require("./PUMP_TRACK_LS");
const functions_1 = require("firebase/functions");
const firestore_2 = require("./firestore");
const PlatformError_1 = require("../util/PlatformError");
const { auth, db, firebaseFunctions } = (0, firestore_2.getFirebaseInstance)();
const signupWithGoogle = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provider = new auth_1.GoogleAuthProvider();
        const cred = yield (0, auth_1.signInWithPopup)(auth, provider);
        const user = cred.user;
        if (user.metadata.creationTime === user.metadata.lastSignInTime) {
            const { displayName, email, photoURL: photoUrl, uid } = user;
            const createdAt = user.metadata.creationTime
                ? new Date(user.metadata.creationTime).getTime()
                : new Date().getTime();
            const name = displayName || (email === null || email === void 0 ? void 0 : email.split('@')[0]) || '';
            const username = generateUsername(name, createdAt.toString());
            yield (0, exports.addUsername)(uid, username);
            const userProfileData = {
                createdAt: Number(createdAt),
                displayName: displayName || '',
                photoUrl: photoUrl || '',
                username,
                totalWorkouts: 0,
                totalExercises: 0,
                lastActive: Number(createdAt),
            };
            const userProfileDocRef = (0, firestore_1.doc)(db, 'userProfileData', uid);
            yield (0, firestore_1.setDoc)(userProfileDocRef, userProfileData);
        }
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
    }
});
exports.signupWithGoogle = signupWithGoogle;
const logout = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, auth_1.signOut)(auth);
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
    }
});
exports.logout = logout;
const addUsername = (uid, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usernameDocRef = (0, firestore_1.doc)(db, 'usernames', username);
        if (yield (0, exports.checkUsernameExists)(username)) {
            return false;
        }
        yield (0, firestore_1.setDoc)(usernameDocRef, { uid });
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
    }
});
exports.addUsername = addUsername;
const checkUsernameExists = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usernameDocRef = (0, firestore_1.doc)(db, 'usernames', username);
        const currUsernameRes = yield (0, firestore_1.getDoc)(usernameDocRef);
        if (currUsernameRes.exists()) {
            return true;
        }
        return false;
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
    }
});
exports.checkUsernameExists = checkUsernameExists;
const updateUsername = (uid, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usernameCollectionRef = (0, firestore_1.collection)(db, 'usernames');
        const q = (0, firestore_1.query)(usernameCollectionRef, (0, firestore_1.where)('uid', '==', uid));
        const queryRes = yield (0, firestore_1.getDocs)(q);
        queryRes.forEach(doc => {
            (0, firestore_1.deleteDoc)(doc.ref);
        });
        yield (0, firestore_1.setDoc)((0, firestore_1.doc)(usernameCollectionRef, username), { uid });
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
    }
});
exports.updateUsername = updateUsername;
const getUserData = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = yield (0, exports.getUIDFromUsername)(username);
        const userProfileDataRef = (0, firestore_1.doc)(db, 'userProfileData', uid);
        const userDataRes = yield (0, firestore_1.getDoc)(userProfileDataRef);
        if (!userDataRes.exists())
            return null;
        return userDataRes.data();
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
        return null;
    }
});
exports.getUserData = getUserData;
const generateUsername = (name, createdAt) => {
    return name.trim().split(' ').join('').toLowerCase() + createdAt.slice(-7);
};
const getUsername = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const uid = (_a = auth === null || auth === void 0 ? void 0 : auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid;
        if (uid) {
            const localStorageData = localStorage.getItem(PUMP_TRACK_LS_1.PUMP_TRACK_LS_USERNAME) || '';
            const localStorageUsername = localStorageData
                ? JSON.parse(localStorageData)[uid]
                : null;
            if (localStorageUsername) {
                return localStorageUsername;
            }
            const usernamesRef = (0, firestore_1.collection)(db, 'usernames');
            const q = (0, firestore_1.query)(usernamesRef, (0, firestore_1.where)('uid', '==', uid));
            const queryRes = yield (0, firestore_1.getDocs)(q);
            let username = '';
            queryRes.forEach(doc => {
                username = doc.id;
            });
            localStorage.setItem(PUMP_TRACK_LS_1.PUMP_TRACK_LS_USERNAME, JSON.stringify({ uid: username }));
            return username;
        }
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
    }
});
exports.getUsername = getUsername;
const getUIDFromUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const usernamesRef = (0, firestore_1.doc)(db, 'usernames', username);
        const usernameRes = yield (0, firestore_1.getDoc)(usernamesRef);
        if (!usernameRes.exists())
            return null;
        return (_b = usernameRes.data().uid) !== null && _b !== void 0 ? _b : null;
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
    }
});
exports.getUIDFromUsername = getUIDFromUsername;
const updateUserActivity = () => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const uid = (_c = auth === null || auth === void 0 ? void 0 : auth.currentUser) === null || _c === void 0 ? void 0 : _c.uid;
        if (uid) {
            const updateActivity = (0, functions_1.httpsCallable)(firebaseFunctions, 'updateActivity');
            updateActivity({ uid });
        }
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
    }
});
exports.updateUserActivity = updateUserActivity;
// export const changeUIDs = async () => {
//   const uid = auth?.currentUser?.uid
//   const currUsername = await getUsername()
//   if (uid && currUsername) {
//     const profilesRef = collection(db, 'userProfileData')
//     const docsSnapshot = await getDocs(profilesRef)
//     const dataArr: UserProfileDataType[] = []
//     docsSnapshot.forEach(doc => {
//       dataArr.push(doc.data() as UserProfileDataType)
//       deleteDoc(doc.ref)
//     })
//     await Promise.all(
//       dataArr.map(async user => {
//         const username = user.username
//         const uid = await getUIDFromUsername(username)
//         const newDoc = doc(profilesRef, uid)
//         await setDoc(newDoc, user)
//       })
//     )
//   }
// }
