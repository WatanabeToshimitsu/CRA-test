import React from 'react';
import { ToggleTheme } from './ToggleTheme';


export function ToolBox(props) {
    return (
        <>
            <ToggleTheme onClick={props.changeSetting}/>
        </>
    )
}