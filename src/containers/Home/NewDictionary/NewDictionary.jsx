import React, {useEffect, useState} from 'react';
import PonsDictionary from "./PonsDictionary/PonsDictionary";

export default function NewDictionary({ setHomeState }) {

    function goHome() {
        setHomeState("Home");
    }
    const backButton = <button onClick={goHome}>Back</button>

    return (
        <>
            <p>Select a dictionary to add</p>
            <PonsDictionary setHomeState={setHomeState}></PonsDictionary>
            <hr></hr>
            {backButton}
        </>
    )
}
