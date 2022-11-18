import React, {useContext} from 'react';
import {SelectionContext} from "../../../SelectionContext/SelectionContext";

export default function AnkiStorage({ setHomeState }) {
    const {saveStorage} = useContext(SelectionContext);

    async function onAnkiConnectClick() {
        let ankiConnectEn = "https://ankiweb.net/shared/info/2055492159";
        await chrome.tabs.create({ url: ankiConnectEn });
    }
    const linkApiKey = <a id="ankiConnectEn" href="https://ankiweb.net/shared/info/2055492159" onClick={onAnkiConnectClick}>Anki-Connect</a>

    const ankiInfoP = <p>To store flashcards in Anki, you need to have installed the Add-on '{linkApiKey}' and Anki has to be open.</p>

    async function addAnkiStorage() {
        const storageOptionsObject = await chrome.storage.sync.get("storageList");
        let storageList = storageOptionsObject["storageList"];
        const storageOptionType = typeof storageList;

        if (storageOptionType === "undefined") {
            storageList = []
        }

        let foundAnki = 0
        for (let i = 0; i < storageList.length; i++) {
            const storageObj = storageList[i];
            if (storageObj["type"] == "ANKI") {
                foundAnki += 1;
            }
        }

        let newStorageObj = {}
        newStorageObj["type"] = "ANKI";
        newStorageObj["name"] = "ANKi-" + foundAnki;

        storageList.push(newStorageObj);

        let obj = {};
        obj["storageList"] = storageList;
        await chrome.storage.sync.set(obj)

        saveStorage(newStorageObj);

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