import React, {useEffect, useState} from 'react';
import AnkiStorage from "./AnkiStorage/AnkiStorage";

export default function NewStorage({ setHomeState }) {

    function goHome() {
        setHomeState("Home");
    }
    const backButton = <button onClick={goHome}>Back</button>

    return (
        <>
            <p>Select a storage option to add</p>
            <AnkiStorage setHomeState={setHomeState}></AnkiStorage>
            <hr></hr>
            {backButton}
        </>
    )
}
