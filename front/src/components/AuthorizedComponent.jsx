import React from 'react';
import { useAuth } from '../context/AuthContext';

function AuthorizedComponent({ children, allowedRoles }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="text-xl">Carregando...</span>
            </div>
        );
    }

    if (!user) {
        return;
    }
    
    const hasPermission = allowedRoles.includes(user.role);

    if (!hasPermission) {
        return;
    }

    return children;
}

export default AuthorizedComponent;