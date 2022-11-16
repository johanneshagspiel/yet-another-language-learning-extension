import {DictionaryLanguageSelection} from "../../Home/Dictionary/DictionaryLanguageSelection";
import {getLanguageFromCode} from "../../../../utils/Helper/LanguageHelper";
import React, {useEffect, useState} from "react";
import {lookUpWordPons} from "../../../../utils/Helper/PonsHelper";
import Rom from "./Rom/Rom";

function DictionarySection({ selectedDeck, selectedDictionary, targetLanguage, sourceLanguage }) {
    const [searchStorageObj, setSearchStorageObj] = useState(null);
    const [wordExists, setWordExists] = useState(false);
    const [searchConducted, setSearchConducted] = useState(false);

    useEffect(async () => {
        const searchStorageObjFound = await chrome.storage.local.get("lastSearchText");
        const searchStorageObj = searchStorageObjFound["lastSearchText"]

        const selectionText = searchStorageObj["selectionText"]
        const selectionTextType = typeof selectionText;

        if (selectionTextType === "undefined") {
            if (searchConducted) {
                setSearchConducted(false);
            }
        } else {
            const checkTranslation = searchStorageObj?.checkTranslation

            if (checkTranslation) {

                const lastSearchText = searchStorageObj["selectionText"];

                let searchParam = {}
                searchParam["query"] = "deck:" + selectedDeck + " back:*" + lastSearchText + "*";

                const translation = lookUpWordPons(lastSearchText, targetLanguage, sourceLanguage);
                searchStorageObj["translation"]= translation

                if (translation.length === 0) {
                    searchStorageObj["wordExists"] = false;
                    if (wordExists) {
                        setWordExists(false)
                    }
                } else {
                    if (!wordExists) {
                        setWordExists(true)
                    }
                }

                let result = {}
                result["lastSearchText"] = searchStorageObj
                await chrome.storage.local.set(result)

                setSearchStorageObj(searchStorageObj)
            }
        }
        //this is the cleanup function called when we move back to the home screen - currently does nothing
        return () => {}
    }, [])

    if (searchStorageObj) {
        let romElementList = null;
        if (wordExists) {
            const translationJson = JSON.parse(searchStorageObj["translation"]);
            const listRomsStrings = translationJson[0]["hits"].map(x =>x["roms"]);

            romElementList = listRomsStrings.map((rom, i) => {
                return (
                    <>
                        <Rom headWordList={rom} key={i} ></Rom>
                    </>)
            })
        }

        return (
            <>
                <DictionaryLanguageSelection dictionaryName={selectedDictionary}></DictionaryLanguageSelection>
                {!wordExists && <p>No translation was found for "{searchStorageObj["selectionText"]}" in {getLanguageFromCode(sourceLanguage)}.</p>}
                {wordExists && romElementList}
            </>
        )
    } else {
        return (
            <>
                <DictionaryLanguageSelection dictionaryName={selectedDictionary}></DictionaryLanguageSelection>
                {<p>No word has been searched.</p>}
            </>
        )

    }
}

export {
    DictionarySection
}