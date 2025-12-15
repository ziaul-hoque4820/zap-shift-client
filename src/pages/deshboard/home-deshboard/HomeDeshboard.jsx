import React from 'react'
import useUserRole from '../../../hooks/useUserRole'
import LoaderSpin from '../../share/LoaderSpin';
import UserDashBoard from './UserDashBoard';

function HomeDeshboard() {
    const { role, roleLoading } = useUserRole();

    if(roleLoading) {
        return <LoaderSpin />
    }

    if(role === 'user'){
        return <UserDashBoard />
    }
}

export default HomeDeshboard