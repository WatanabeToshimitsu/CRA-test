import React from 'react';
import { CharGenerator } from './CharGenerator';
import { ToolBox } from './ToolBox';
import { HowToPlay } from './HowToPlay';
import { defaultSetting, SettingContext, ChangeSetting } from './SettingContext'
import styles from './App.module.css';

export function App() {
    const [setting, setSetting] = React.useState(defaultSetting);

    const changeSetting = React.useCallback<ChangeSetting>(
        /* "setSetting((prev) => Object.assign(prev, obj))" didn't work
         -> React uses Object.is with comparing. And Object.assign(target, src) return target object.
            So above expression doesn't work.
            Execute following code.

            const foo = { a: 1, b: 2 };
            const bar = { b: 3, c: 4 };
            const test = Object.is(foo, Object.assign({ ...foo }, bar));
            console.log(test);
        */
        (obj) => setSetting((prev) => Object.assign({ ...prev }, obj))
        , []);
    
    
    
    return (
        <div className={styles[setting.theme]}>
            <SettingContext.Provider value={setting}>
                <CharGenerator/>
                <ToolBox changeSetting={changeSetting}/>
                <HowToPlay />
            </SettingContext.Provider>
        </div>
    )
}
export default App;
