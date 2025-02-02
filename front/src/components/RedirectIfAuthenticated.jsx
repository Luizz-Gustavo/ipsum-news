import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RedirectIfAuthenticated = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return null;
    }
    
    if (user) {
        return <Navigate to="/home" replace />;
    }
    
    return children;
};

export default RedirectIfAuthenticated;