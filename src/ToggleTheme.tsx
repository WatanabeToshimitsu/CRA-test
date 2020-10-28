import React from 'react';
import { ChangeSetting, SettingContext } from './SettingContext';
import styles from './ToggleTheme.module.css';
//import Button from '@material-ui/core';

export const ToggleTheme: React.FC<{onClick: ChangeSetting}> = (props) => {
    const { theme, ..._ } = React.useContext(SettingContext)    
    const newTheme = theme === 'Morning' ? 'Night' : 'Morning';

    return (
        <button
            onClick={() => props.onClick({ theme: newTheme })}
            className={styles[theme]}
        >
            {newTheme}
        </button>
    )
}