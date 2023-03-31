import React from 'react';
import {Outlet} from "react-router-dom";
import styles from './MinimalLayout.module.css';
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

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