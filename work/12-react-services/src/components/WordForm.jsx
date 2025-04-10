import { useState } from "react";
import Status from "./Status";
import '../css/WordForm.css';

function WordForm({ word, onUpdateWord, error }) {
    const [newWord, setNewWord] = useState(word || '');

    function onChange(e) {
        setNewWord(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        onUpdateWord(newWord);
    }

    return (
        <div className="word">
            <form className="word-form" onSubmit={onSubmit}>
                <label htmlFor="word" className="word-label">
                    <span className="label-name">Your new word:</span>
                    <input type="text" className="label-input" value={newWord} onChange={onChange} />
                </label>
                <button className="update-button">Update</button>
                {error && <Status error={error} />}
            </form>
        </div>
    );
}

export default WordForm;