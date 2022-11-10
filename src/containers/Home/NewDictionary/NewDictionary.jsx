import React, {useEffect, useState} from 'react';

export default function NewDictionary({ setHomeState }) {
    const [dictionaryList, setDictionaryList] = useState(null);

    useEffect(async () => {
        const dictionaryOptionsObject = await chrome.storage.sync.get("dictionary");
        const dictionaryList = dictionaryOptionsObject["dictionary"];
        const dictionaryListType = typeof dictionaryList;

        if (dictionaryListType != "undefined") {
            setDictionaryList(dictionaryList);
        }
    });

    //const addNewDictionaryButton = <button type="button" onClick={addNewDictionary}>Add new dictionary</button>

    return (
        <>
            <p>Select a dictionary to add</p>
            <p>PONS</p>
            <p>Obtain an API key <a id="linkApiKey" href="https://en.pons.com/p/online-dictionary/developers/api">here</a></p>
        </>
    )
}
