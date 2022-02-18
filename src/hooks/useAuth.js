import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useMemo
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updateProfile
} from 'firebase/auth';
import { ROUTES } from 'common';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const AuthContext = createContext();
export function AuthProvider({ children }) {
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isUserLoggedIn = useMemo(() => {
        return !!user;
    }, [user]);

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            setUser(response.user);

            return response.user;
        } catch (error) {
            console.log('Error', error.message);
        }
    };

    const register = async (email, password) => {
        try {
            const newUser = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            setUser(newUser.user);

            return newUser.user;
        } catch (error) {
            console.log('Error', error.message);
        }
    };

    const updateUser = async (firstName, lastName) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: `${firstName} | ${lastName}}`
            });

            return true;
        } catch (error) {
            console.log('Error', error.message);

            return false;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.log('Error', error.message);
        }
    };

    const sendPasswordReset = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);

            return true;
        } catch (error) {
            console.log('Error', error.message);

            return false;
        }
    };

    const confirmResetPassword = async (code, password) => {
        try {
            await confirmPasswordReset(auth, code, password);
        } catch (error) {
            console.log('Error', error.message);
        }

        return true;
    };

    const userFullName = useMemo(() => {
        if (!user) return '';

        return user?.displayName?.split('|').join('');
    }, [user]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        user,
        login,
        register,
        logout,
        sendPasswordReset,
        confirmResetPassword,
        isUserLoggedIn,
        updateUser,
        userFullName
    };
}

export const useAuth = () => {
    return useContext(AuthContext);
};
