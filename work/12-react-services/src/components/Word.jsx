import Loading from "./Loading";
import '../css/Word.css';

function Word({
    word,
    isWordPending,
}) {
    const SHOW = {
        PENDING: 'pending',
        EMPTY: 'empty',
        WORD: 'word'
    }

    let show;
    if (isWordPending) {
        show = SHOW.PENDING;
    } else if (!word) {
        show = SHOW.EMPTY;
    } else {
        show = SHOW.WORD;
    }

    return (
        <>
            {show === SHOW.PENDING && (
                <Loading className="word-waiting">Loading word...</Loading>
            )}
            {show === SHOW.EMPTY && (
                <p className="panel-word">You have no stored word</p>
            )}
            {show === SHOW.WORD && (
                <p className="panel-word">Your word is <span className="word-stored">{word}</span></p>
            )}
        </>
    );
}

export default Word;