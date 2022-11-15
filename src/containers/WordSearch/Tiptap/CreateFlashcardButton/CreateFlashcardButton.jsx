import React from 'react';
import {addNote} from "../../../../../utils/Helper/AnkiHelper";

export default function CreateFlashcardButton({ front, back }) {

    function clickCreateFlashcard() {

        let searchParam = {};
        searchParam["note"]= {};

        searchParam["note"]["deckName"] = "Italienisch";
        searchParam["note"]["modelName"] = "Basic";
        searchParam["note"]["fields"] = {}

        searchParam["note"]["fields"]["Front"] = front.getHTML();
        searchParam["note"]["fields"]["Back"] = back.getHTML();

        const result = addNote(searchParam);
    }

    return (
        <>
            <button type="button" onClick={clickCreateFlashcard}>Create a new flashcard</button>
        </>
    )
}