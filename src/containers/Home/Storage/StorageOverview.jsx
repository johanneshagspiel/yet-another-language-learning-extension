import React, {useContext, useEffect, useState} from 'react';
import {StorageSelection} from "./StorageSelection";
import {SelectionContext} from "../../SelectionContext/SelectionContext";

export default function StorageOverview({setState}) {
    const [storageList, setStorageList] = useState(null);
    const {storage, saveStorage} = useContext(SelectionContext);

    useEffect(async () => {
        const storageOptionsObject = await chrome.storage.sync.get("storageList");
        const storageList = storageOptionsObject["storageList"];
        const storageListType = typeof storageList;

        if (storageListType !== "undefined") {
            setStorageList(storageList);
        }
        //this is the cleanup function called when we move back to the home screen - currently does nothing
        return () => {}
    },[]);

    function onStorageSelection(storageObj) {
        saveStorage(storageObj);
    }

    let storageElementList = null;
    if (storageList) {
        storageElementList = storageList.map((storageObj, i) => {
            return (
                <div key={"div" + i}>
                    <input type="radio" key={'storage' + i}
                           onChange={() => onStorageSelection(storageObj)}
                           id={storageObj["type"]}
                           checked={storageObj["name"] === storage["name"]}></input>
                    <label htmlFor={storageObj["type"]} key={'label' + i}>{storageObj["type"]}</label>
                </div>
            )
        })
    }

    function addNewStorage() {
        setState("NewStorage");
    }

    const notShowNewStorageButton = storageList?.length >= 2;
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
