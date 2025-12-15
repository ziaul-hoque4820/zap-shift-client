import React from 'react'
import useUserRole from '../../../hooks/useUserRole'
import LoaderSpin from '../../share/LoaderSpin';
import UserDashBoard from './UserDashBoard';
import RiderDashboard from './RiderDashboard';
import AdminDashboard from './AdminDashboard';
import { Link } from 'react-router-dom';

function HomeDeshboard() {
    const { role, roleLoading } = useUserRole();

    if(roleLoading) {
        return <LoaderSpin />
    }

    if(role === 'user'){
        return <UserDashBoard />
    } 
    else if(role === 'rider'){
        return <RiderDashboard />
    }
    else if (role === 'admin'){
        return <AdminDashboard />
    } 
    else{
        return <Link to={'/*'}></Link>
    }
}

export default HomeDeshboard