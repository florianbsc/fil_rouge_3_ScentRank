import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

type User = {
    id: string;
    email: string;
    role: "user" | "admin";
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (token: string, user: User) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 🔁 Auto-login au démarrage
    useEffect(() => {
        const bootstrapAuth = async () => {
            const storedToken = await SecureStore.getItemAsync("token");
            const storedUser = await SecureStore.getItemAsync("user");

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
            setIsLoading(false);
        };

        bootstrapAuth();
    }, []);

    const login = async (jwt: string, userData: User) => {
        await SecureStore.setItemAsync("token", jwt);
        await SecureStore.setItemAsync("user", JSON.stringify(userData));
        setToken(jwt);
        setUser(userData);
        router.replace("/(tabs)");
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("user");
        setToken(null);
        setUser(null);
        router.replace("/(auth)/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
