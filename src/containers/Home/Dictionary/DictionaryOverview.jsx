import React, {useContext, useEffect, useState} from 'react';
import {DictionaryLanguageSelection} from "./DictionaryLanguageSelection";
import {SelectionContext} from "../../SelectionContext/SelectionContext";

export default function DictionaryOverview({ setState }) {
    const [dictionaryList, setDictionaryList] = useState(null);
    const {dictionary, saveDictionary} = useContext(SelectionContext);

    useEffect(async () => {
        const dictionaryOptionsListObject = await chrome.storage.sync.get("dictionaryList");
        const dictionaryList = dictionaryOptionsListObject["dictionaryList"];
        const dictionaryListType = typeof dictionaryList;

        if (dictionaryListType !== "undefined") {
            setDictionaryList(dictionaryList);
        }
    }, []);


    function onSelectDictionary(dictionaryObj) {
        saveDictionary(dictionaryObj);
    }

    let dictionaryElementList = null;
    if (dictionaryList) {
        dictionaryElementList = dictionaryList.map((dictionaryObj, i) => {
            return (
                <div key={"dic" + i}>
                    <input type="radio"
                           key={"dic" + i}
                           onChange={() => onSelectDictionary(dictionaryObj)}
                           id={dictionaryObj["type"]}
                           checked={dictionaryObj["name"] == dictionary["name"]}>

                    </input>
                    <label htmlFor={dictionaryObj["type"]}>{dictionaryObj["type"]}</label>
                </div>)
        })
    }

    const notShowAddDictionaryButton = dictionaryList?.length >= 2
    function addNewDictionary() {
        setState("NewDictionary");
    }
    const addNewDictionaryButton = <button type="button" onClick={addNewDictionary}>Add new dictionary</button>

    function emptyFunction() {}

    const languageSelectionDic = <DictionaryLanguageSelection onChangeParentFunction={emptyFunction}></DictionaryLanguageSelection>

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
