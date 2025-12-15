import React from 'react'
import useUserRole from '../../../hooks/useUserRole'
import LoaderSpin from '../../share/LoaderSpin';
import UserDashBoard from './UserDashBoard';
import RiderDashboard from './RiderDashboard';

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
}

export default HomeDeshboard