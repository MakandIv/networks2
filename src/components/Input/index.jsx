import React from 'react';
import styles from './Input.module.css'

const Input = ({type, name, label, ...props}) => {
    return (
        <div className={styles.input_block}>
            <label className={styles.label}>{label}</label>
            <input {...props} name={name} type={type}/>
        </div>
    );
};

export default Input;