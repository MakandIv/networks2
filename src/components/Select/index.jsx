import React from 'react';
import styles from './Select.module.css'

const Select = ({children, value, name, label, required, ...props}) => {
    return (
        <div className={styles.input_block}>
            <label className={styles.label}>{label}{required ? "*": ""}</label>
            <select value={value} required={required} {...props} name={name}>
                {children}
            </select>
        </div>
    );
};

export default Select;