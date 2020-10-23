import React from 'react';
import './App.css';

function App() {
  const [chars, setChars] = React.useState([]);

  const addChars = React.useCallback((char) => setChars((prev) => [char, ...prev]), [setChars]);

  return (
    <div>
      <header className="App-header">
        <CharGenerator chars={chars} addChars={addChars} />
      </header>
    </div>
  )
}

function CharGenerator(props) {
  const randomAreaWidth = 95;
  const randomAreaHight = 80;
  const maxFontSize = 20
  const top = Math.random() * randomAreaHight -2;
  const left = Math.random() * randomAreaWidth -2;
  const fontsize = Math.random() * maxFontSize;
  
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
    console.log(rgb);
  }
  return (
    <div>
      <p className={"Title"} onKeyPress={generateChar} tabIndex={0}>Generate Charactors</p>
      <CharCluster chars={props.chars}>
      </CharCluster>
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
  const style = {
    position: "absolute",
    top: `${props.top}vh`,
    left: `${props.left}vw`,
    fontSize: `${props.fontsize}vmin`,
    color: `${props.rgb}`,
    margin: 0
  };

  return (
    <p style={style}>{props.char}</p>
  )
}

export default App;
