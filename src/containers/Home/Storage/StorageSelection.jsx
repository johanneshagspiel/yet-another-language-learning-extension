import {connectedToAnki, getDeckname} from "../../../../utils/Helper/AnkiHelper";
import DeckOptions from "./DeckOptions/DeckOptions";
import React, {useEffect, useState} from "react";

function StorageSelection() {
    const [showError, setShowError] = useState(false);
    const [deckNames, setDeckNames] = useState(null);
    const [selectedDeck, setSelectedDeck] = useState(-1);

    let errorMessage = <p></p>
    let deckOptions = null;

    async function asynGetDeckname() {
        const promiseDeckNames = await getDeckname();

        if (JSON.stringify(promiseDeckNames) !== JSON.stringify(deckNames)) {
            setDeckNames(promiseDeckNames);
        }
    }

    const isConnectedToAnki = connectedToAnki();

    if (isConnectedToAnki) {
        if (showError) {
            setShowError(false);
        }

        asynGetDeckname();

        const deckNamesList = String(deckNames).split(",")

        let cleanedDeckNamesList = []
        for (var i = 0; i < deckNamesList.length; i++) {
            let deckName = String(deckNamesList[i]).trim();
            if (deckName !== "Default") {
                cleanedDeckNamesList.push(deckName)
            }
        }

        if (cleanedDeckNamesList.length === 0) {
            errorMessage = <p>No decks were found</p>
            if (!showError) {
                setShowError(true);
            }
        } else {
            deckOptions = <DeckOptions deckNameList={cleanedDeckNamesList}></DeckOptions>
        }
    } else {
        if (!showError) {
            setShowError(true);
        }

        async function onAnkiConnectClick() {
            let ankiConnectEn = "https://ankiweb.net/shared/info/2055492159";
            await chrome.tabs.create({url: ankiConnectEn});
        }

        const linkApiKey = <a id="ankiConnectEn" href="https://ankiweb.net/shared/info/2055492159"
                              onClick={onAnkiConnectClick}>Anki-Connect</a>
        errorMessage =
            <p>Could not connect to Anki. Make sure that 1. you have installed the Add-on {linkApiKey}, 2. Anki is
                currently running and that 3. the host and port settings for 'Anki-Connect' are correct</p>
    }

    function clickTryToConnect() {
        const isConnectedToAnki = connectedToAnki();
        if (isConnectedToAnki) {
            if (showError) {
                setShowError(false);
            }
        }
    }
    const tryToConnectButton = <button type="button" onClick={clickTryToConnect}>Try to connect</button>

    return (
        <>
            {showError && errorMessage}
            {showError && tryToConnectButton}
            {deckOptions && deckOptions}
        </>
    )
}

export {
    StorageSelection
}