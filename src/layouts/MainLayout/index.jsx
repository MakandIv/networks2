import React from 'react';
import {Header} from "../../components";
import {Outlet} from "react-router-dom";
import styles from './MainLayout.module.css'

const MainLayout = () => {
    return (
        <>
            <Header/>
            <div className={styles.main}>
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;