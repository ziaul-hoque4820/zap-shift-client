import React from 'react'
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { useLocation } from 'react-router-dom';
import LoaderSpir from '../pages/share/LoaderSpin'

function RiderRoute({ children }) {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();
    const location = useLocation();

    if (loading || roleLoading) {
        return <LoaderSpir></LoaderSpir>
    }

    if (!user || role !== 'rider') {
        return <Navigate to={'/*'} state={location.pathname}></Navigate>
    }

    return children;
}

export default RiderRoute