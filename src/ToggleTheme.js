import React from 'react';
import { SettingContext } from './Context';
import styles from './ToggleTheme.module.css';
//import Button from '@material-ui/core';

export function ToggleTheme(props) {
    const { theme, ..._ } = React.useContext(SettingContext)    
    const newTheme = theme === 'Morning' ? 'Night' : 'Morning';



    // useContext
    return (
        <button
            onClick={() => props.onClick({ theme: newTheme })}
            className={styles[theme]}
        >
            {newTheme}
        </button>
    )
}