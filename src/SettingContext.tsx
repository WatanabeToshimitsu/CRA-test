import React from 'react';

interface Setting {
    theme: string;
    red: "ff";
    green: "ff";
    blue: "ff";
    opacity: number;
    
}

export type ChangeSetting = (obj: Partial<Setting>) => void;

export const defaultSetting: Setting = {
    theme: "Morning",
    red: "ff",
    green: "ff",
    blue: "ff",
    opacity: 0.8
}
export const SettingContext = React.createContext(defaultSetting);