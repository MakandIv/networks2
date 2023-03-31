import React from 'react';
import styles from './Button.module.css';

const Button = ({type, children, ...props}) => {
    return (
        <button {...props} className={styles.button} type={type}>{children}</button>
    );
};

export default Button;