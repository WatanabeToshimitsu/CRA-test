import React from 'react';
import { ChangeSetting } from './SettingContext';
import { ToggleTheme } from './ToggleTheme';


export const ToolBox: React.FC<{ changeSetting: ChangeSetting }> = (props) => {
    return (
        <>
            <ToggleTheme onClick={props.changeSetting}/>
        </>
    )
}