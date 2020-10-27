import React from 'react';
export const defaultSetting = {
    theme: "Morning",
    red: 256,
    green: 256,
    blue: 256,
    opacity: 0.8
}
export const SettingContext = React.createContext(defaultSetting);