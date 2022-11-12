import React, {useState} from 'react';

export default function CreateFlashcardButton({ front, back }) {

    function clickCreateFlashcard() {
        console.log(front.getHTML());
        console.log(back.getHTML())
    }

    return (
        <>
            <button type="button" onClick={clickCreateFlashcard}>Create a new flashcard</button>
        </>
    )
}