import React from 'react';
import {useSpring, animated} from 'react-spring'
import './App.scss';

function App() {
  const [chars, setChars] = React.useState([]);
  const [isMorning, setIsMorning] = React.useState(true);

  const addChars = React.useCallback((char) => setChars((prev) => [char, ...prev]), [setChars]);
  const toggleMorning = React.useCallback(()=> setIsMorning((prev) => !prev), [setIsMorning]);

  return (
    <div className={"App" + (isMorning ? "__Morning" : "__Night")}>
      <CharGenerator chars={chars} addChars={addChars} />
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
      id: new Date().getTime(),
      char: e.key,
      top: top,
      left: left,
      fontsize: fontsize,
      rgb: rgb
    });
  }
  return (
    <div>
        <p className={"Title"} onKeyPress={generateChar} tabIndex={0}>Generate Charactors</p>
        <CharCluster chars={props.chars} />
    </div>

  )
}

function CharCluster(props) {
  const charList = props.chars.map((char) => (
    <Char
      key={char.id}
      char={char.char}
      top={char.top}
      left={char.left}
      fontsize={char.fontsize}
      height={char.fontsize}
      rgb={char.rgb}
    />
  ))

  return (
    <div>
      {charList}
    </div>
  )
}


function Char(props) {
  const [existing, setExisting] = React.useState(true);
  const erase = React.useCallback(() => setExisting(false), [setExisting]);
  
  const spring = useSpring({
    fontSize: `${props.fontsize}em`,
    opacity: existing ? 0.8 : 0,
    position: "absolute",
    top: `${props.top}vh`,
    left: `${props.left}vw`,
    color: `${props.rgb}`,
    margin: 0,
    transform: `translate(-50%, -50%)`
  });

  return (
      <animated.div
        style={spring}
        onMouseEnter={erase}
      >
      {props.char}
      </animated.div>
    )
}

export default App;
