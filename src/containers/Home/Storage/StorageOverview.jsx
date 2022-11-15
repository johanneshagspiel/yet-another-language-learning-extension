import React, {useEffect, useState} from 'react';
import {connectedToAnki, getDeckname} from "../../../../utils/Helper/AnkiHelper";
import DeckOptions from "./DeckOptions/DeckOptions";
import {StorageSelection} from "./StorageSelection";

export default function StorageOverview({setState}) {
    const [storageList, setStorageList] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(-1);
    // const [showError, setShowError] = useState(false);
    // const [deckNames, setDeckNames] = useState(null);
    // const [selectedDeck, setSelectedDeck] = useState(-1);

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
                {storageElementList}
                {!notShowNewStorageButton && addNewStorageButton}
                <StorageSelection ></StorageSelection>
            </>
        )
    }
}
