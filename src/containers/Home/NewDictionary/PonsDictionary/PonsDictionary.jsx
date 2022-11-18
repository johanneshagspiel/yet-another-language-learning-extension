import React, {useContext, useState} from 'react';
import {tryConnection} from "../../../../../utils/Helper/PonsHelper";
import {SelectionContext} from "../../../SelectionContext/SelectionContext";

export default function PonsDictionary({ setHomeState }) {
    const [ponsApiKey, setApiKey] = useState("")
    const [showPonsError, setShowPonsError] = useState(false);
    const {saveDictionary} = useContext(SelectionContext);


    async function onApiKeyClick() {
        let ponsWebsiteEn = "https://en.pons.com/p/online-dictionary/developers/api";
        await chrome.tabs.create({ url: ponsWebsiteEn });
    }
    const linkApiKey = <a id="linkApiKey" href="https://en.pons.com/p/online-dictionary/developers/api" onClick={onApiKeyClick}>here</a>

    async function addNewPonsDictionary() {

        if (ponsApiKey.length !== 0) {
            const successfullConnectionTest = tryConnection(ponsApiKey);

            if (!successfullConnectionTest) {
                setShowPonsError(true);
                setApiKey("");
            } else {

                const dictionaryOptionsObject = await chrome.storage.sync.get("dictionaryList");
                let dictionaryList = dictionaryOptionsObject["dictionaryList"];
                const dictionaryListType = typeof dictionaryList;

                if (dictionaryListType === "undefined") {
                    dictionaryList = []
                }

                let foundPons = 0
                for (let i = 0; i < dictionaryList.length; i++) {
                    const dictionaryObj = dictionaryList[i];
                    if (dictionaryObj["type"] === "PONS") {
                        foundPons += 1;
                    }
                }

                let newDictionaryObj = {}
                newDictionaryObj["type"] = "PONS";
                newDictionaryObj["key"] = ponsApiKey;
                newDictionaryObj["name"] = "PONS-" + foundPons;

                dictionaryList.push(newDictionaryObj)

                let obj = {};
                obj["dictionaryList"] = dictionaryList;
                await chrome.storage.sync.set(obj)

                saveDictionary(newDictionaryObj);

                setHomeState("Home");
            }
        }
    }

    function apiKeyTyping(e) {
        setApiKey(e.target.value);
    }

    return (
        <>
            <p>PONS</p>
            <p>Obtain an API key {linkApiKey}</p>
            <form>
                {showPonsError && <label>Invalid API key</label>}
                {showPonsError && <br></br>}
                <label htmlFor="ponsApiInput">API Key: </label>
                <input type="text" value={ponsApiKey} onChange={apiKeyTyping}></input>
                <br></br>
                <button id="ponsDictionaryButton" type="button" onClick={addNewPonsDictionary}>Add</button>
            </form>
        </>
    )
}
