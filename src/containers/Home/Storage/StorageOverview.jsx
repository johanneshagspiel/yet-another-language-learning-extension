import React, {useEffect, useState} from 'react';

export default function StorageOverview({ setState }) {
    const [storageList, setStorageList] = useState(null);

    useEffect(async () => {
        const storageOptionsObject = await chrome.storage.sync.get("storage");
        const storageList = storageOptionsObject["storage"];
        const storageListType = typeof storageList;

        if (storageListType != "undefined") {
            setStorageList(storageList);
        }
    });

    function addNewStorage() {
        setState("NewStorage");
    }

    const addNewStorageButton = <button type="button" onClick={addNewStorage}>Add new storage option</button>

    if (!storageList) {
        return (
            <>
                <p>Storage</p>
                <p>Add a storage option first</p>
                {addNewStorageButton}
            </>
        )
    }

    return (
        <>
            <p>Storage</p>
            {!storageList && addNewStorageButton}
        </>
    )
}
