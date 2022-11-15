import React, {useState} from 'react';
import {getSupportedLanguageDic, getLanguageFromCode, getCountryCodeFromLanguage} from "../../../../utils/Helper/LanguageHelper";

function DictionaryLanguageSelection({ dictionaryName }) {
    //const [dictionaryName, setDictionaryName] = useState("PONS");
    const [sourceLanguage, setSourceLanguage] = useState("ar");
    const [targetLanguage, setTargetLanguage] = useState("ar");

    const supportedLanguageDic = getSupportedLanguageDic()[dictionaryName];
    const supportedSourceLanguagesArray = Object.keys(supportedLanguageDic);
    const supportedSourceLanguagesFullArray = supportedSourceLanguagesArray.map(x => getLanguageFromCode(x).split(",")[0].split(";")[0]);

    async function saveSourceLanguage(sourceLanguageCode) {
        const storeObj = {
            "sourceLanguageCode": sourceLanguageCode
        };
        await chrome.storage.local.set(storeObj);
    }
    function selectNewSourceLanguage(e) {
        const selectedSourceCountryCode = getCountryCodeFromLanguage(e.target.value);
        saveSourceLanguage(selectedSourceCountryCode);

        if (targetLanguage !== selectedSourceCountryCode) {
            setTargetLanguage(selectedSourceCountryCode)
        }
    }

    async function saveTargetLanguage(targetLanguageCode) {
        const storeObj = {
            "targetLanguageCode": targetLanguageCode
        };
        await chrome.storage.local.set(storeObj);
    }
    function selectNewTargetLanguage(e) {
        const selectedTargetCountryCode = getCountryCodeFromLanguage(e.target.value);
        saveTargetLanguage(selectedTargetCountryCode);
    }

    const targetLanguageDic = supportedLanguageDic[targetLanguage]
    const supportedTargetLanguagesArray = Object.values(targetLanguageDic);
    const supportedTargetLanguagesFullArray = supportedTargetLanguagesArray.map(x => getLanguageFromCode(x).split(",")[0].split(";")[0]);
    const targetLanguageList = supportedTargetLanguagesFullArray.map(((option, i) => {
        if (i == 0) {
            return (
                <option selected dangerouslySetInnerHTML={{ __html: option }} key={"option" + i} ></option>
            )
        } else {
            return (
                <option dangerouslySetInnerHTML={{ __html: option }} key={"option" + i} ></option>
            )
        }
    }))

    const sourceLanguageList = supportedSourceLanguagesFullArray.map(((option, i) => {
        return (
            <option dangerouslySetInnerHTML={{ __html: option }} key={"option" + i} ></option>
        )
    }))

    return (
        <div>
            <label>Source Language: </label>
            <select onChange={selectNewSourceLanguage}>
                {sourceLanguageList}
            </select>
            <br></br>
            <label>Target Language: </label>
            <select onChange={selectNewTargetLanguage}>
                {targetLanguageList}
            </select>
        </div>
    )
}

export {
    DictionaryLanguageSelection
}