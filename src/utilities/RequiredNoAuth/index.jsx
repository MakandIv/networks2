import React from 'react';
import {Navigate} from "react-router-dom";

const RequiredNoAuth = ({children}) => {
    return localStorage.getItem('accessToken') ? <Navigate to="/" /> : children;
};

export default RequiredNoAuth;