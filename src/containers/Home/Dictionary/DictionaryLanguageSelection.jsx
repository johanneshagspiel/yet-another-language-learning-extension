import React, {useState} from 'react';
import {getSupportedLanguageDic, getLanguageFromCode, getCountryCodeFromLanguage} from "../../../../utils/Helper/LanguageHelper";

export default function DictionaryLanguageSelection({ dictionaryName }) {
    const [targetLanguage, setTargetLanguage] = useState("ar");

    const supportedLanguageDic = getSupportedLanguageDic()[dictionaryName];
    const supportedSourceLanguagesArray = Object.keys(supportedLanguageDic);
    const supportedSourceLanguagesFullArray = supportedSourceLanguagesArray.map(x => getLanguageFromCode(x).split(",")[0].split(";")[0]);

    function selectNewSourceLanguage(e) {
        const selectedCountryCode = getCountryCodeFromLanguage(e.target.value);

        if (targetLanguage !== selectedCountryCode) {
            setTargetLanguage(selectedCountryCode)
        }
    }

    const targetLanguageDic = supportedLanguageDic[targetLanguage]
    const supportedTargetLanguagesArray = Object.values(targetLanguageDic);
    const supportedTargetLanguagesFullArray = supportedTargetLanguagesArray.map(x => getLanguageFromCode(x).split(",")[0].split(";")[0]);
    const targetLanguageList = supportedTargetLanguagesFullArray.map(((option, i) => {
        return (
            <option dangerouslySetInnerHTML={{ __html: option }} key={"option" + i} ></option>
        )
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
            <select>
                {targetLanguageList}
            </select>
        </div>
    )
}