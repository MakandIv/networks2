import React from 'react';
import styles from "../RadioButtons/Radiobuttons.module.css";

const RadioButtons = ({name = "", values = [{}], required = false, label = "", checked = "", ...props}) => {
    return (
        <div className={styles.block}>
            <label className={styles.label}>{label}{required ? "*" : ""}</label>
            <div className={styles.inputs}>
                {values.map((value) => <div className={styles.input}
                                            key={value.value}>
                        <input
                            {...props}
                            type="radio"
                            name={name}
                            value={value.value}
                            checked={checked === value.value}
                        />
                        <label>{value.label}</label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RadioButtons;