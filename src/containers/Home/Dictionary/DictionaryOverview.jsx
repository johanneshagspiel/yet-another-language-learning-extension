import React, {useEffect, useState} from 'react';

export default function DictionaryOverview({ setState }) {
    const [dictionaryList, setDictionaryList] = useState(null);

    useEffect(async () => {
        const dictionaryOptionsObject = await chrome.storage.sync.get("dictionary");
        const dictionaryList = dictionaryOptionsObject["dictionary"];
        const dictionaryListType = typeof dictionaryList;

        if (dictionaryListType !== "undefined") {
            setDictionaryList(dictionaryList);
        }
    });

    function addNewDictionary() {
        setState("NewDictionary");
    }

    const addNewDictionaryButton = <button type="button" onClick={addNewDictionary}>Add new dictionary</button>

    return (
        <>
            <p>Dictionary</p>
            {!dictionaryList && <p>Add a dictionary first</p>}
            {!dictionaryList && addNewDictionaryButton}
        </>
    )
}
