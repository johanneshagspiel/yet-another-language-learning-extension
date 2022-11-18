import {Tiptap} from "./Tiptap/Tiptap";
import {StorageSelection} from "../../Home/Storage/StorageSelection";
import {ModelSelection} from "../../Home/Storage/ModelSelection/ModelSelection";
import React, {useContext, useEffect} from "react";
import {checkWordExists} from "../../../../utils/Helper/AnkiHelper";
import {SelectionContext} from "../../SelectionContext/SelectionContext";

function FlashCardSection() {
    const {deck} = useContext(SelectionContext);

    let cardExists = false;
    let lastSearchText = "";

    useEffect(async () => {

        let searchStorageObj = await chrome.storage.local.get("lastSearchText");

        const checkStorage = searchStorageObj?.checkStorage

        if (checkStorage) {

            searchStorageObj["checkStorage"] = false;

            lastSearchText = searchStorageObj["selectionText"];

            let searchParam = {}
            searchParam["query"] = "deck:" + deck + " back:*" + lastSearchText + "*";

            const resultCardExists = await checkWordExists(searchParam);
            if (resultCardExists) {
                searchStorageObj["cardExists"] = true;
                cardExists = true
            }

            let result = {}
            result["lastSearchText"] = searchStorageObj
            await chrome.storage.local.set(result)
        }
        //this is the cleanup function called when we move back to the home screen - currently does nothing
        return () => {}
    }, [])

    return (
        <div>
            <Tiptap></Tiptap>
            {cardExists && <p>A flashcard already exists for "{lastSearchText}".</p>}
            <StorageSelection></StorageSelection>
            <ModelSelection></ModelSelection>
        </div>
    )
}

export {
    FlashCardSection
}