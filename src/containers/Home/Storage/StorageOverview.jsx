import React, {useEffect, useState} from 'react';
import {connectedToAnki, getDeckname} from "../../../../utils/Helper/AnkiHelper";
import DeckOptions from "./DeckOptions/DeckOptions";

export default function StorageOverview({setState}) {
    const [storageList, setStorageList] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(-1);
    const [showError, setShowError] = useState(false);
    const [deckNames, setDeckNames] = useState(null);
    const [selectedDeck, setSelectedDeck] = useState(-1);

    useEffect(async () => {
        const storageOptionsObject = await chrome.storage.sync.get("storage");
        const storageList = storageOptionsObject["storage"];
        const storageListType = typeof storageList;

        if (storageListType != "undefined") {
            setStorageList(storageList);
        }
        //this is the cleanup function called when we move back to the home screen - currently does nothing
        return () => {}
    },[]);

    function onStorageSelection(index) {
        setSelectedStorage(index);
    }

    let storageElementList = null;
    if (storageList) {
        storageElementList = storageList.map((storageObj, i) => {
            if (i === 0) {
                return (
                    <div key={"div" + i}>
                        <input type="radio" key={'storage' + i} onChange={() => onStorageSelection(i)}
                               id={storageObj["type"]} checked={true}></input>
                        <label htmlFor={storageObj["type"]} key={'label' + i}>{storageObj["type"]}</label>
                    </div>
                )
            } else {
                return (
                    <div key={"div" + i}>
                        <input type="radio" key={'storage' + i} onChange={() => onStorageSelection(i)}
                               id={storageObj["type"]}></input>
                        <label htmlFor={storageObj["type"]} key={'label' + i}>{storageObj["type"]}</label>
                    </div>
                )
            }
        })
        if (selectedStorage !== 0) {
            setSelectedStorage(0);
        }
    }

    function addNewStorage() {
        setState("NewStorage");
    }

    const notShowNewStorageButton = storageList;
    const addNewStorageButton = <button type="button" onClick={addNewStorage}>Add new storage option</button>

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

    if (!storageList) {
        return (
            <>
                <p>Storage</p>
                <p>Add a storage option first</p>
                {addNewStorageButton}
            </>
        )
    } else {
        return (
            <>
                <p>Storage</p>
                {showError && errorMessage}
                {showError && tryToConnectButton}
                {storageElementList}
                {!notShowNewStorageButton && addNewStorageButton}
                {deckOptions && deckOptions}
            </>
        )
    }
}
