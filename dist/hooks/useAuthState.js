"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthState = void 0;
const react_1 = require("react");
const firestore_1 = require("pump-track-common/services/firestore");
const auth_1 = require("pump-track-common/services/auth");
const PUMP_TRACK_LS_1 = require("pump-track-common/services/PUMP_TRACK_LS");
const useAuthState = () => {
    const [user, setUser] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const { auth } = (0, firestore_1.getFirebaseInstance)();
    (0, react_1.useEffect)(() => {
        const unsubscribe = auth.onAuthStateChanged(userInstance => {
            if (userInstance) {
                (0, auth_1.getUsername)().then(() => {
                    setUser(userInstance);
                    (0, auth_1.updateUserActivity)();
                });
            }
            else {
                setUser(null);
                localStorage.removeItem(PUMP_TRACK_LS_1.PUMP_TRACK_LS_USERNAME);
            }
            setLoading(false);
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { user, loading };
};
exports.useAuthState = useAuthState;
