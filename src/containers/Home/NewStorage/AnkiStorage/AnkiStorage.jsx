import React from 'react';

export default function AnkiStorage({ setHomeState }) {

    async function onAnkiConnectClick() {
        let ankiConnectEn = "https://ankiweb.net/shared/info/2055492159";
        await chrome.tabs.create({ url: ankiConnectEn });
    }
    const linkApiKey = <a id="ankiConnectEn" href="https://ankiweb.net/shared/info/2055492159" onClick={onAnkiConnectClick}>Anki-Connect</a>

    const ankiInfoP = <p>To store flashcards in Anki, you need to have installed the Add-on '{linkApiKey}' and Anki has to be open.</p>

    async function addAnkiStorage() {
        const storageOptionsObject = await chrome.storage.sync.get("storage");
        let storageList = storageOptionsObject["storage"];
        const storageOptionType = typeof storageList;

        if (storageOptionType === "undefined") {
            storageList = []
        }

        let newStorageObj = {}
        newStorageObj["type"] = "ANKI";

        storageList.push(newStorageObj);

        let obj = {};
        obj["storage"] = storageList;

        await chrome.storage.sync.set(obj)
        setHomeState("Home");
    }

    return (
        <>
            <p>Anki</p>
            {ankiInfoP}
            <button id="ankiStorageButton" type="button" onClick={addAnkiStorage}>Add</button>
        </>
)
}