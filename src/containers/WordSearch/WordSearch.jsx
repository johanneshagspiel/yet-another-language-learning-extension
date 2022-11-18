import React, {useEffect, useState} from 'react';
import {FlashCardSection} from "./FlashCardSection/FlashCardSection";
import {DictionarySection} from "./DictionarySection/DictionarySection";


export default function WordSearch({ setHomeState }) {

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
            <FlashCardSection></FlashCardSection>
            <hr></hr>
            <DictionarySection></DictionarySection>
        </div>
    )
}
