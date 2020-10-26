import React from 'react';
import { Spring } from 'react-spring/renderprops';
import './App.scss';

function App() {
    const [chars, setChars] = React.useState([]);
    const [charID, setCharID] = React.useState(0);
    const [isMorning, setIsMorning] = React.useState(true);

    const addChars = React.useCallback((char) => {
        setChars((prev) => [char, ...prev]);
        setCharID((prev) => prev + 1);
    }, [setChars, setCharID]);
    
    const deleteChar = React.useCallback((id) =>
        () => {
            setChars((prev) => prev.filter((char) => char.id !== id))
        }, [setChars])

    const toggleMorning = React.useCallback(() => setIsMorning((prev) => !prev), [setIsMorning]);

    return (
        <div className={"App" + (isMorning ? "__Morning" : "__Night")}>
            <CharGenerator
                chars={chars}
                charID={charID}
                deleteChar={deleteChar}
                addChars={addChars}
            />
            <button
                onClick={toggleMorning}
                className={"ThemeToggle" + (isMorning ? "__Morning" : "__Night")}
            >
                {isMorning ? "Turn to night" : "Turn to morning"}
            </button>
        </div>
    )
}

function CharGenerator(props) {
    const randomAreaWidth = 98;
    const randomAreaHight = 95;
    const top = Math.random() * randomAreaHight;
    const left = Math.random() * randomAreaWidth;

    const minFontSize = 0.5
    const maxFontSize = 5
    const fontSizeRatio = Math.random();
    const fontsize = fontSizeRatio * maxFontSize + (1 - fontSizeRatio) * minFontSize;

    const randNumIn256 = () => (Math.round(Math.random() * 256));
    const red = randNumIn256().toString(16);
    const green = randNumIn256().toString(16);
    const blue = randNumIn256().toString(16);
    const rgb = "#" + red + green + blue;

    const generateChar = (e) => {
        props.addChars({
            id: props.charID,
            char: e.key,
            top: top,
            left: left,
            fontsize: fontsize,
            rgb: rgb,
            isExisting: true
        });
    }
    return (
        <div>
            <p className={"Title"} onKeyPress={generateChar} tabIndex={0}>Generate Charactors</p>
            <CharCluster chars={props.chars} deleteChar={props.deleteChar}/>
        </div>

    )
}

function CharCluster(props) {

    const charList = props.chars.map((char) => {
        return (
            <Char
                key={char.id}
                id={char.id}
                char={char.char}
                top={char.top}
                left={char.left}
                fontsize={char.fontsize}
                height={char.fontsize}
                rgb={char.rgb}
                deleteChar={props.deleteChar}
            />
        );
    })

    return (
        <div>
            {charList}
        </div>
    )
}


function Char(props) {

    const style = {
        fontSize: `${props.fontsize}em`,
        position: "absolute",
        top: `${props.top}vh`,
        left: `${props.left}vw`,
        color: `${props.rgb}`,
        margin: 0,
        transform: `translate(-50%, -50%)`
    };

    const char = props.char;

    return (
        <div style={style} onMouseOver={props.deleteChar(props.id)}>
            <Spring from={{opacity: 0}} to={{opacity: 0.8}}>
                {props =><div style={props}>{char}</div>}
            </Spring>
        </div>
    )
}

export default App;
