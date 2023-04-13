import React from 'react';
import {Outlet} from "react-router-dom";
import styles from './MinimalLayout.module.css';

const MinimalLayout = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.block}>
                <Outlet />
            </div>
        </div>
    );
};

export default MinimalLayout;