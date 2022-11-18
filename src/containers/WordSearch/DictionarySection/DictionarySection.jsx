import {DictionaryLanguageSelection} from "../../Home/Dictionary/DictionaryLanguageSelection";
import {getLanguageFromCode} from "../../../../utils/Helper/LanguageHelper";
import React, {useContext, useEffect, useState} from "react";
import {lookUpWordPons} from "../../../../utils/Helper/PonsHelper";
import Rom from "./Rom/Rom";
import {SelectionContext} from "../../SelectionContext/SelectionContext";
import {ResponseErrorMessage} from "./ResponseErrorMessage";

function DictionarySection() {
    const {dictionary, targetLanguageCode, sourceLanguageCode} = useContext(SelectionContext);

    const [searchStorageObj, setSearchStorageObj] = useState(null);
    const [conductSearch, setConductSearch] = useState(false);
    const [statusCode, setStatusCode] = useState(204)

    useEffect(async () => {
        const searchStorageObjFound = await chrome.storage.local.get("lastSearchText");
        setSearchStorageObj(searchStorageObjFound["lastSearchText"])
        return () => {}
    }, [])

    function newLanguageSelection() {
        searchStorageObj.checkTranslation = true
        setSearchStorageObj(searchStorageObj)
    }

    async function checkTranslation() {
        const selectionText = searchStorageObj?.selectionText
        const selectionTextType = typeof selectionText;

        if (selectionTextType !== "undefined") {

            const checkTranslation = searchStorageObj?.checkTranslation

            if (conductSearch || checkTranslation) {

                const lastSearchText = searchStorageObj["selectionText"];

                const [statusCode, translation] = lookUpWordPons(lastSearchText, targetLanguageCode, sourceLanguageCode);
                searchStorageObj["translation"] = translation

                if (statusCode === 200) {
                    searchStorageObj["wordExists"] = true
                } else {
                    searchStorageObj["wordExists"] = false;
                    setStatusCode(statusCode)
                }

                searchStorageObj["checkTranslation"] = false;

                let result = {}
                result["lastSearchText"] = searchStorageObj
                await chrome.storage.local.set(result)

                setSearchStorageObj(searchStorageObj)
                setConductSearch(false)
            }
        }
    }

    checkTranslation()

    if (searchStorageObj) {
        let romElementList = null;
        if (searchStorageObj["wordExists"]) {
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
                <DictionaryLanguageSelection onChangeParentFunction={newLanguageSelection}></DictionaryLanguageSelection>
                {!searchStorageObj["wordExists"] && <ResponseErrorMessage statusCode={statusCode}
                                                                          selectionText={searchStorageObj["selectionText"]}
                                                                          sourceLanguageCode={getLanguageFromCode(sourceLanguageCode)}
                                                                          targetLanguageCode={targetLanguageCode}></ResponseErrorMessage>}
                {searchStorageObj["wordExists"] && romElementList}
            </>
        )
    } else {
        return (
            <>
                <DictionaryLanguageSelection onChangeParentFunction={newLanguageSelection}></DictionaryLanguageSelection>
                {<p>No word has been searched.</p>}
            </>
        )

    }
}

export {
    DictionarySection
}