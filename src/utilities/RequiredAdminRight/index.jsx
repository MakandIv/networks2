import React from 'react';
import {useSelector} from "react-redux";

const RequiredAdminRight = ({children}) => {
    const {role} = useSelector((state) => state.user);
    return (role === 'ADMIN' ? children : <></>)
};

export default RequiredAdminRight;