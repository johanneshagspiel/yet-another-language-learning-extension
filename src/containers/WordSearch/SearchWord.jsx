import React, {useEffect, useState} from 'react';
import {checkWordExists, invoke} from "../../../utils/Helper/AnkiHelper";
import {lookUpWordPons} from "../../../utils/Helper/PonsHelper";
import {getLanguageFromCode} from "../../../utils/Helper/LanguageHelper";
import Rom from "./Rom/Rom";

export default function SearchWord() {
    const [searchTextObj, setSearchTextObj] = useState(null);

    const selectedDeck = "Französisch";
    const inLanguage = "fr";
    const targetLanguage = "de";

    useEffect(async () => {

        const lastSearchTextDic = await chrome.storage.local.get("last_search_text")

        const lastSearchTextObj = lastSearchTextDic["last_search_text"];
        const to_look_up = lastSearchTextObj?.to_look_up

        if (to_look_up) {

            const lastSearchText = lastSearchTextObj["selection_text"];

            let searchParam = {}
            searchParam["query"] = "deck:" + selectedDeck + " back:*" + lastSearchText + "*";

            var newSearchTextObj = {};
            newSearchTextObj["selection_text"] = lastSearchText;
            newSearchTextObj["to_look_up"] = false;
            newSearchTextObj["card_exists"] = false;
            newSearchTextObj["word_exists"] = true;

            const cardExists = await checkWordExists(searchParam);
            if (cardExists) {
                newSearchTextObj["card_exists"] = true;
            }

            const translation = lookUpWordPons(lastSearchText, targetLanguage, inLanguage);
            newSearchTextObj["translation"]= translation

            if (translation.length === 0) {
                newSearchTextObj["word_exists"] = false;
            }

            let result = {}
            result["last_search_text"] = newSearchTextObj
            await chrome.storage.local.set(result)

            setSearchTextObj(newSearchTextObj)

        } else {

            setSearchTextObj(lastSearchTextObj)
        }
    }, [])

    if (!searchTextObj) {
        return (
        <>
            <h1>No word looked up.</h1>
        </>
        )
    } else {
        const word_exists = searchTextObj["word_exists"];
        const card_exists = searchTextObj["card_exists"];
        const selection_text = searchTextObj["selection_text"];
        const translation = searchTextObj["translation"];

        let romElementList = null

        if (word_exists) {

            const translationJson = JSON.parse(translation);
            const romsList = translationJson[0]["hits"].map(x =>x["roms"]);

            romElementList = romsList.map((rom, i) => {
                return (<Rom
                    headWordList={rom}
                    key={i}
                >
                </Rom>)
            })

        }

        return (
            <>
                {card_exists && <p>A flashcard already exists for "{selection_text}".</p>}
                {!word_exists && <p>No translation was found for "{selection_text}" in {getLanguageFromCode(inLanguage)}.</p>}
                {word_exists && romElementList}
            </>
        )
    }
}
