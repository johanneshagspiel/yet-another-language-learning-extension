import React, {useEffect, useState} from 'react';
import {checkWordExists, invoke} from "../../../utils/Helper/AnkiHelper";
import {lookUpWordPons} from "../../../utils/Helper/PonsHelper";
import {getLanguageFromCode} from "../../../utils/Helper/LanguageHelper";
import Rom from "./Rom/Rom";
import {Tiptap} from "./Tiptap/Tiptap";
import {DictionaryLanguageSelection} from "../Home/Dictionary/DictionaryLanguageSelection";
import {StorageSelection} from "../Home/Storage/StorageSelection";
import {ModelSelection} from "../Home/Storage/ModelSelection/ModelSelection";


export default function WordSearch({ setHomeState }) {
    const [searchTextObj, setSearchTextObj] = useState(null);

    const selectedDictionary = "PONS";
    const selectedStorage = "ANKI";
    const selectedDeck = "Italienisch";
    const selectedModule = "Basic"
    const sourceLanguage = "it";
    const targetLanguage = "de";

    useEffect(async () => {

        const lastSearchTextDic = await chrome.storage.local.get("last_search_text");

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

            const translation = lookUpWordPons(lastSearchText, targetLanguage, sourceLanguage);
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
        //this is the cleanup function called when we move back to the home screen - currently does nothing
        return () => {}
    }, [])

    function goHome() {
        setHomeState("Home");
    }
    const backButton = <button onClick={goHome}>Back</button>

    if (!searchTextObj) {
        return (
        <>
            <br></br>
            {backButton}
            <br></br>
            <br></br>
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
            <div>
                <br></br>
                {backButton}
                <br></br>
                <br></br>
                <Tiptap></Tiptap>
                <hr></hr>
                <StorageSelection></StorageSelection>
                <ModelSelection></ModelSelection>
                <DictionaryLanguageSelection dictionaryName={selectedDictionary}></DictionaryLanguageSelection>
                <hr></hr>
                {card_exists && <p>A flashcard already exists for "{selection_text}".</p>}
                {!word_exists && <p>No translation was found for "{selection_text}" in {getLanguageFromCode(sourceLanguage)}.</p>}
                {word_exists && romElementList}
            </div>
        )
    }
}