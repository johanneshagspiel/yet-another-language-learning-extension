import React, {useEffect, useState} from 'react';
import {FlashCardSection} from "./FlashCardSection/FlashCardSection";
import {DictionarySection} from "./DictionarySection/DictionarySection";


export default function WordSearch({ setHomeState }) {

    const selectedDeck = "Italienisch";
    const [searchTextObj, setSearchTextObj] = useState(null);

    const selectedDictionary = "PONS";
    const selectedStorage = "ANKI";

    const selectedModule = "Basic"
    const sourceLanguage = "it";
    const targetLanguage = "de";

    function goHome() {
        setHomeState("Home");
    }
    const backButton = <button onClick={goHome}>Home</button>

    return (
        <div>
            <br></br>
            {backButton}
            <br></br>
            <br></br>
            <FlashCardSection selectedDeck={selectedDeck}></FlashCardSection>
            <hr></hr>
            <DictionarySection selectedDeck={selectedDeck} selectedDictionary={selectedDictionary}
                               targetLanguage={targetLanguage} sourceLanguage={sourceLanguage}></DictionarySection>
        </div>
    )
}
