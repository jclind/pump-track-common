"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserActivity = exports.getUIDFromUsername = exports.getUsername = exports.getUserData = exports.updateUsername = exports.checkUsernameExists = exports.addUsername = exports.logout = exports.signupWithGoogle = void 0;
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const PUMP_TRACK_LS_1 = require("./PUMP_TRACK_LS");
const functions_1 = require("firebase/functions");
const firestore_2 = require("./firestore");
const PlatformError_1 = require("src/util/PlatformError");
const { auth, db, firebaseFunctions } = (0, firestore_2.getFirebaseInstance)();
const signupWithGoogle = async () => {
    try {
        const provider = new auth_1.GoogleAuthProvider();
        const cred = await (0, auth_1.signInWithPopup)(auth, provider);
        const user = cred.user;
        if (user.metadata.creationTime === user.metadata.lastSignInTime) {
            const { displayName, email, photoURL: photoUrl, uid } = user;
            const createdAt = user.metadata.creationTime
                ? new Date(user.metadata.creationTime).getTime()
                : new Date().getTime();
            const name = displayName || email?.split('@')[0] || '';
            const username = generateUsername(name, createdAt.toString());
            await (0, exports.addUsername)(uid, username);
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
            await (0, firestore_1.setDoc)(userProfileDocRef, userProfileData);
        }
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
    }
};
exports.signupWithGoogle = signupWithGoogle;
const logout = async () => {
    try {
        await (0, auth_1.signOut)(auth);
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
    }
};
exports.logout = logout;
const addUsername = async (uid, username) => {
    try {
        const usernameDocRef = (0, firestore_1.doc)(db, 'usernames', username);
        if (await (0, exports.checkUsernameExists)(username)) {
            return false;
        }
        await (0, firestore_1.setDoc)(usernameDocRef, { uid });
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
    }
};
exports.addUsername = addUsername;
const checkUsernameExists = async (username) => {
    try {
        const usernameDocRef = (0, firestore_1.doc)(db, 'usernames', username);
        const currUsernameRes = await (0, firestore_1.getDoc)(usernameDocRef);
        if (currUsernameRes.exists()) {
            return true;
        }
        return false;
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
    }
};
exports.checkUsernameExists = checkUsernameExists;
const updateUsername = async (uid, username) => {
    try {
        const usernameCollectionRef = (0, firestore_1.collection)(db, 'usernames');
        const q = (0, firestore_1.query)(usernameCollectionRef, (0, firestore_1.where)('uid', '==', uid));
        const queryRes = await (0, firestore_1.getDocs)(q);
        queryRes.forEach(doc => {
            (0, firestore_1.deleteDoc)(doc.ref);
        });
        await (0, firestore_1.setDoc)((0, firestore_1.doc)(usernameCollectionRef, username), { uid });
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
    }
};
exports.updateUsername = updateUsername;
const getUserData = async (username) => {
    try {
        const uid = await (0, exports.getUIDFromUsername)(username);
        const userProfileDataRef = (0, firestore_1.doc)(db, 'userProfileData', uid);
        const userDataRes = await (0, firestore_1.getDoc)(userProfileDataRef);
        if (!userDataRes.exists())
            return null;
        return userDataRes.data();
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
        return null;
    }
};
exports.getUserData = getUserData;
const generateUsername = (name, createdAt) => {
    return name.trim().split(' ').join('').toLowerCase() + createdAt.slice(-7);
};
const getUsername = async () => {
    try {
        const uid = auth?.currentUser?.uid;
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
            const queryRes = await (0, firestore_1.getDocs)(q);
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
};
exports.getUsername = getUsername;
const getUIDFromUsername = async (username) => {
    try {
        const usernamesRef = (0, firestore_1.doc)(db, 'usernames', username);
        const usernameRes = await (0, firestore_1.getDoc)(usernamesRef);
        if (!usernameRes.exists())
            return null;
        return usernameRes.data().uid ?? null;
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
    }
};
exports.getUIDFromUsername = getUIDFromUsername;
const updateUserActivity = async () => {
    try {
        const uid = auth?.currentUser?.uid;
        if (uid) {
            const updateActivity = (0, functions_1.httpsCallable)(firebaseFunctions, 'updateActivity');
            updateActivity({ uid });
        }
    }
    catch (error) {
        (0, PlatformError_1.PlatformError)(error);
    }
};
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
