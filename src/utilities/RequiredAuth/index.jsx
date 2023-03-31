import React from 'react';
import {Navigate, useLocation} from "react-router-dom";

const RequiredAuth = ({children}) => {
    const location = useLocation();
    return !localStorage.getItem('accessToken') ? <Navigate to="/login" state={{ from: location }} /> : children;
};

export default RequiredAuth;