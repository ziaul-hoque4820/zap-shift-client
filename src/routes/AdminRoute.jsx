import React from 'react'
import useAuth from '../hooks/useAuth'
import useUserRole from '../hooks/useUserRole';
import { Navigate, useLocation } from 'react-router-dom';

function AdminRoute({children}) {
    const {user, loading} = useAuth();
    const {role, roleLoading} = useUserRole();
    const location = useLocation();

    if(loading || roleLoading){
        return <div>Loading...</div>
    }

    if(!user || role !== 'admin'){
        return <Navigate to={'/*'} state={location.pathname}></Navigate>
    }

  return children;
}

export default AdminRoute