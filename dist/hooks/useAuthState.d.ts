import { User } from 'firebase/auth';
interface AuthState {
    user: User | null;
    loading: boolean;
}
export declare const useAuthState: () => AuthState;
export {};
