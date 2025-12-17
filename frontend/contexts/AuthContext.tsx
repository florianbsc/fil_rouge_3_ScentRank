import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

type User = {
    id: string;
    email: string;
    role: "user" | "admin";
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (token: string, user: User) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // 🔄 Restauration session au démarrage
    useEffect(() => {
        (async () => {
            const storedToken = await SecureStore.getItemAsync("token");
            const storedUser = await SecureStore.getItemAsync("user");

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        })();
    }, []);

    const login = async (jwt: string, userData: User) => {
        await SecureStore.setItemAsync("token", jwt);
        await SecureStore.setItemAsync("user", JSON.stringify(userData));
        setToken(jwt);
        setUser(userData);
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("user");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
