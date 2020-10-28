import React from 'react';
import { Spring } from 'react-spring/renderprops';
import styles from './CharGenerator.module.css';

interface CharParam {
        top: number;
        left: number;
        fontsize: number;
        rgb: string;
        isExisting: boolean;
};

interface CharProf {
    id: number;
    char: string;
    param: CharParam;
};

interface DeleteChar {
    (charId: number): void;
}

type CharProfArr = Array<CharProf>;

const CharGenerator: React.FC<{}> = (props) => {
    const [charProfs, seCharProfs] = React.useState<CharProfArr>([]);
    const [charID, setCharID] = React.useState(0);

    /*
    const addChars = React.useCallback<(char: CharProf) => void>(char => {
        setChars((prev) => [char, ...prev]);
        setCharID((prev) => prev + 1);
    }, [setChars, setCharID]);
    */
    
    const deleteChar = React.useCallback<DeleteChar>((charId) => {
        seCharProfs((prev) => prev.filter((char) => char.id !== charId))
    }, [seCharProfs])
    
    const param = calcCharParam();

    const generateChar = React.useCallback<(e: React.KeyboardEvent<HTMLDivElement>) => void>(e => {
        seCharProfs((prev) => [{ id: charID, char: e.key, param: param }, ...prev]);
        setCharID((prev) => prev + 1);
    }, [charID, param]);
    /*
    const generateChar = (e: React.KeyboardEvent<HTMLDivElement>, ) => {
        addChars({
            id: charID,
            char: e.key,
            param: param,
        });
    }
    */
    
    return (
        <div>
            <div
                onKeyPress={generateChar}
                tabIndex={0}
                className={styles.Main}
            >
                Generate Characters
            </div>
            <CharCluster charProfs={charProfs} deleteChar={deleteChar} />
        </div>

    )
};

const CharCluster: React.FC<{charProfs: CharProfArr, deleteChar: DeleteChar}> = (props) => {

    const charList = props.charProfs.map((prof) => {
        return (
            <Char
                key={prof.id}
                prof={prof}
                deleteSelf={() => props.deleteChar(prof.id)}
            />
        );
    })

    return (
        <div>
            {charList}
        </div>
    )
}


const Char: React.FC<{ prof: CharProf, deleteSelf: () => void}>= (props) => {
    const { prof, deleteSelf } = props
    const char = prof.char === 'Enter' ? '!' : prof.char; // TODO: fix DASA code
    const { fontsize, top, left, rgb } = prof.param


    const style = {
        fontSize: `${fontsize}em`,
        position: 'absolute',
        top: `${top}vh`,
        left: `${left}vw`,
        color: `${rgb}`,
        margin: 0,
        transform: `translate(-50%, -50%)`
    } as const;

    return (
        <div style={style} onMouseOver={deleteSelf}>
            <Spring from={{ opacity: 0 }} to={{ opacity: 0.8 }}>
                {props => <div style={props}>{char}</div>}
            </Spring>
        </div>
    )
}

function calcCharParam():CharParam {
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

    return {
        top: top,
        left: left,
        fontsize: fontsize,
        rgb: rgb,
        isExisting: true
    }
}


export { CharGenerator };