import React, {useEffect, useState} from 'react';
import {DictionaryLanguageSelection} from "./DictionaryLanguageSelection";

export default function DictionaryOverview({ setState }) {
    const [dictionaryList, setDictionaryList] = useState(null);
    const [selectedDictionary, setSelectedDictionary] = useState("");

    useEffect(async () => {
        const dictionaryOptionsObject = await chrome.storage.sync.get("dictionary");
        const dictionaryList = dictionaryOptionsObject["dictionary"];
        const dictionaryListType = typeof dictionaryList;

        if (dictionaryListType !== "undefined") {
            setDictionaryList(dictionaryList);
        }
    }, []);

    async function saveDictionaryName(dictionaryName) {
        const storeObj = {
            "dictionaryName": dictionaryName
        };
        await chrome.storage.local.set(storeObj);
    }

    function onSelectDictionary(dictionaryName) {
        saveDictionaryName(dictionaryName);
        setSelectedDictionary(dictionaryName);
    }

    let dictionaryElementList = null;
    if (dictionaryList) {
        dictionaryElementList = dictionaryList.map((dictionaryObj, i) => {
            if (i === 0) {
                return (
                    <div key={"dic" + i}>
                        <input type="radio" key={"dic" + i} onChange={() => onSelectDictionary(dictionaryObj["type"])} id={dictionaryObj["type"]} checked={true}></input>
                        <label htmlFor={dictionaryObj["type"]}>{dictionaryObj["type"]}</label>
                    </div>)
            } else {
                return (
                <div key={"dic" + i}>
                    <input type="radio" key={"dic" + i} onChange={() => onSelectDictionary(dictionaryObj["type"])} id={dictionaryObj["type"]}></input>
                    <label htmlFor={dictionaryObj["type"]}>{dictionaryObj["type"]}</label>
                </div>)
            }
        })
    }

    const notShowAddDictionaryButton = dictionaryList
    function addNewDictionary() {
        setState("NewDictionary");
    }
    const addNewDictionaryButton = <button type="button" onClick={addNewDictionary}>Add new dictionary</button>

    const languageSelectionDic = <DictionaryLanguageSelection dictionaryName={"PONS"}></DictionaryLanguageSelection>

    if (!dictionaryList) {
        return (
            <>
                <p>Dictionary</p>
                <p>Add a dictionary first</p>
                {addNewDictionaryButton}
            </>
        )

    } else {
        return (
            <>
                <p>Dictionary</p>
                {dictionaryElementList}
                {!notShowAddDictionaryButton && addNewDictionaryButton}
                {languageSelectionDic}
            </>
        )
    }
}
