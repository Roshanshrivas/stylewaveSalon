import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
    const {accessToken, user} = useSelector((state) => state.auth);

    // Not logged in -> go to login
    if(!accessToken){
        return <Navigate to="/login" replace />;
    }

    //Role based restriction
    if(role && user?.role !== role){
        return <Navigate to="/" replace />;
    }

    //allowed -> render the page
    return children;
}

export default PrivateRoute