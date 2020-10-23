import React from 'react';
import {useSpring, animated} from 'react-spring'
import './App.css';

function App() {
  const [chars, setChars] = React.useState([]);

  const addChars = React.useCallback((char) => setChars((prev) => [char, ...prev]), [setChars]);

  return (
    <div className="App">
        <CharGenerator chars={chars} addChars={addChars} />
    </div>
  )
}

function CharGenerator(props) {
  const randomAreaWidth = 95;
  const randomAreaHight = 80;
  const top = Math.random() * randomAreaHight -2;
  const left = Math.random() * randomAreaWidth - 2;
  
  const minFontSize = 5
  const maxFontSize = 20
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
  const erase = React.useCallback(() => setExisting((prev) => !prev), [setExisting]);

  const style = {
    position: "absolute",
    top: `${props.top}vh`,
    left: `${props.left}vw`,
    fontSize: `${props.fontsize}vmin`,
    color: `${props.rgb}`,
    margin: 0
  };

  if (existing) {
    return <p style={style} onMouseOver={erase}>{props.char}</p>
  }
  else {
    return false
  }
}

export default App;
