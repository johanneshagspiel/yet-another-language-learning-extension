import React, {useEffect, useState} from 'react';

export default function DictionaryOverview({ setState }) {
    const [dictionaryList, setDictionaryList] = useState(null);
    const [selectedDictionary, setSelectedDictionary] = useState(0);

    useEffect(async () => {
        const dictionaryOptionsObject = await chrome.storage.sync.get("dictionary");
        const dictionaryList = dictionaryOptionsObject["dictionary"];
        const dictionaryListType = typeof dictionaryList;

        if (dictionaryListType !== "undefined") {
            setDictionaryList(dictionaryList);
        }
    }, []);

    function onSelectDictionary(index) {
        setSelectedDictionary(index);
    }
    let dictionaryElementList = null;
    if (dictionaryList) {

        dictionaryElementList = dictionaryList.map((dictionaryObj, i) => {
            if (i === 0) {
                return (
                    <>
                        <input type="radio" key={i} onChange={() => onSelectDictionary(i)} id={dictionaryObj["type"]} checked={true}></input>
                        <label htmlFor={dictionaryObj["type"]}>{dictionaryObj["type"]}</label>
                    </>)
            } else {
                return (
                <>
                    <input type="radio" key={i} onChange={() => onSelectDictionary(i)} id={dictionaryObj["type"]}></input>
                    <label htmlFor={dictionaryObj["type"]}>{dictionaryObj["type"]}</label>
                </>)
            }
        })
    }

    const notShowAddDictionaryButton = dictionaryList
    function addNewDictionary() {
        setState("NewDictionary");
    }
    const addNewDictionaryButton = <button type="button" onClick={addNewDictionary}>Add new dictionary</button>

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
                {}
            </>
        )
    }
}
