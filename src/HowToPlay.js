import React from 'react';
import styles from './HowToPlay.module.css';

export function HowToPlay(props) {
    return (
        <>
            <div className={styles.Title}>How to play</div>
            <div className={styles.Sentence}>
                <div>Click "Generate Characters".</div>
                <div>Push any key.</div>
                <div>Trace obstacle charctor.</div>
                <div>Click Night button</div>
            </div>
        </>
    )
}