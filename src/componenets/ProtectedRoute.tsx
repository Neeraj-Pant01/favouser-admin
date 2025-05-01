import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const user = useSelector((state: any) => state.user.loggedUser);


    return user ? (
        <>{children}</>
    ) : (
        <Navigate to="/" replace />
    );
};

export default ProtectedRoute;