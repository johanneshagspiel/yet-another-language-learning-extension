import React, {useContext, useEffect, useState} from 'react';
import {getSupportedLanguageDic, getLanguageFromCode, getCountryCodeFromLanguage} from "../../../../utils/Helper/LanguageHelper";
import Select from 'react-select'
import {SelectionContext} from "../../SelectionContext/SelectionContext";

function DictionaryLanguageSelection({ onChangeParentFunction }) {
    const [dictionaryName, setDictionaryName] = useState("PONS");
    const {sourceLanguageCode, saveSourceLanguageCode, targetLanguageCode, saveTargetLanguageCode} = useContext(SelectionContext);

    const supportedLanguageDic = getSupportedLanguageDic()[dictionaryName];

    const supportedSourceLanguagesArray = Object.keys(supportedLanguageDic);
    const supportedSourceLanguagesFullArray = supportedSourceLanguagesArray.map(x => [x, getLanguageFromCode(x).split(",")[0].split(";")[0]]);

    function selectNewSourceLanguage(e) {
        const selectedSourceCountryCode = e.value;

        console.log(selectedSourceCountryCode)
        console.log(targetLanguageCode)
        console.log("#")
        saveSourceLanguageCode(selectedSourceCountryCode);

        const tempTargetLanguageDic = supportedLanguageDic[selectedSourceCountryCode]
        const firstTargetLanguageCode = tempTargetLanguageDic[0]
        saveTargetLanguageCode(firstTargetLanguageCode);

        onChangeParentFunction()
    }

    function selectNewTargetLanguage(e) {
        const selectedTargetCountryCode = e.value;
        saveTargetLanguageCode(selectedTargetCountryCode);

        onChangeParentFunction()
    }

    const targetLanguageDic = supportedLanguageDic[sourceLanguageCode]

    const supportedTargetLanguagesArray = Object.values(targetLanguageDic);
    const supportedTargetLanguagesFullArray = supportedTargetLanguagesArray.map(x => [x, getLanguageFromCode(x).split(",")[0].split(";")[0]]);
    const targetLanguageOptionList = supportedTargetLanguagesFullArray.map((languageArray) => {
        let obj = {}
        obj["value"] = languageArray[0]
        obj["label"] = languageArray[1]
        return obj
    })


    const sourceLanguageOptionList = supportedSourceLanguagesFullArray.map((languageArray) => {
        let obj = {}
        obj["value"] = languageArray[0]
        obj["label"] = languageArray[1]
        return obj
    })

    const sourceDefaultValue = {}
    sourceDefaultValue["value"] = sourceLanguageCode
    sourceDefaultValue["label"] = getLanguageFromCode(sourceLanguageCode).split(",")[0].split(";")[0]

    const targetDefaultValue = {}
    targetDefaultValue["value"] = targetLanguageCode
    targetDefaultValue["label"] = getLanguageFromCode(targetLanguageCode).split(",")[0].split(";")

    return (
        <div>
            <div key={"source-" + sourceLanguageCode}>
                <label>Source Language: </label>
                <Select options={sourceLanguageOptionList} defaultValue={sourceDefaultValue} onChange={selectNewSourceLanguage}></Select>
            </div>
            <br></br>
            <div key={"target-" + targetLanguageCode}>
                <label>Target Language: </label>
                <Select options={targetLanguageOptionList} defaultValue={targetDefaultValue} onChange={selectNewTargetLanguage}></Select>
            </div>
        </div>
    )
}

export {
    DictionaryLanguageSelection
}