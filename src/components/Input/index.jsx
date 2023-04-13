import React from 'react';
import styles from './Input.module.css'

const Input = ({type, name, label, required, ...props}) => {
    return (
        <div className={styles.input_block}>
            <label className={styles.label}>{label}{required ? "*": ""}</label>
            <input {...props} required={required} name={name} type={type}/>
        </div>
    );
};

export default Input;