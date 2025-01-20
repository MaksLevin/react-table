import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '@core/store/auth/auth.selectors';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useSelector(selectAuth);
    return user ? children : <Navigate to="/login" />;
};
