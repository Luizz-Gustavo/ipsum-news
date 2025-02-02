import React, { createContext, useContext } from 'react';
import { loginService, logoutService } from '../api/services/authService';
import Api from '../api/api';
import useSWR from 'swr';

const AuthContext = createContext();

const fetcher = async () => {
    try {
        const response = await Api.get('/me');
        return response.data;
    } catch (error) {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const { data: user, mutate, isLoading } = useSWR('/me', fetcher);

    const login = async (email, password) => {
        await loginService(email, password);
        await mutate();
    };

    const logout = async () => {
        await logoutService();
        await mutate(null, false);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading: isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};