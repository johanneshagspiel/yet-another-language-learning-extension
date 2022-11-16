import React, {useLayoutEffect, useState, createContext, useContext} from 'react';
import WordSearch from "../../containers/WordSearch/WordSearch";
import './Popup.css';
import Home from "../../containers/Home/Home";
import NewDictionary from "../../containers/Home/NewDictionary/NewDictionary";
import NewStorage from "../../containers/Home/NewStorage/NewStorage";
import {SelectionContext} from "../../containers/SelectionContext/SelectionContext";

export default function Popup() {
    const [homeState, setHomeState] = useState("WordSearch");
    const [sourceLanguageCode, setSourceLanguageCode] = useState("de");
    const [targetLanguageCode, setTargetLanguageCode] = useState("en");

    const value = {sourceLanguageCode, saveSourceLanguageCode, targetLanguageCode, saveTargetLanguageCode}

    async function saveSourceLanguageCode(newSourceLanguageCode) {
        const storeObj = {
            "sourceLanguageCode": newSourceLanguageCode
        };
        await chrome.storage.local.set(storeObj);
        setSourceLanguageCode(newSourceLanguageCode);
    }
    async function saveTargetLanguageCode(newTargetLanguageCode) {
        const storeObj = {
            "targetLanguageCode": newTargetLanguageCode
        };
        await chrome.storage.local.set(storeObj);
        setTargetLanguageCode(newTargetLanguageCode);
    }


    async function changeHomeState(newState) {
        const storeObj = {
            "popupState": newState
        };
        await chrome.storage.local.set(storeObj);
        setHomeState(newState)
    }

    useLayoutEffect(() => {
        async function fetchStartInformation() {
            const lastStateResult = await chrome.storage.local.get("popupState");
            const lastState = lastStateResult["popupState"];
            if (homeState !== lastState) {
                setHomeState(lastState);
            }

            const storedSourceLanguageCodeObj = await chrome.storage.local.get("sourceLanguageCode");
            const storedSourceLanguageCode = storedSourceLanguageCodeObj["sourceLanguageCode"]
            setSourceLanguageCode(storedSourceLanguageCode);

            const storedTargetLanguageCodeObj = await chrome.storage.local.get("targetLanguageCode");
            const storedTargetLanguageCode = storedTargetLanguageCodeObj["targetLanguageCode"]
            setTargetLanguageCode(storedTargetLanguageCode);

        }
        fetchStartInformation();
    }, [homeState, sourceLanguageCode]);


    switch (homeState) {
        case "WordSearch":
            return (
                <SelectionContext.Provider value={value}>
                    <div>
                        <WordSearch setHomeState={changeHomeState}></WordSearch>
                    </div>
                </SelectionContext.Provider>
            );
        case "Home":
            return (
                <SelectionContext.Provider value={value}>
                    <div>
                        <Home setHomeState={changeHomeState}></Home>
                    </div>
                </SelectionContext.Provider>
            );
        case "NewStorage":
            return (
                <>
                    <NewStorage setHomeState={changeHomeState}></NewStorage>
                </>
            )
        case "NewDictionary":
            return (
                <>
                    <NewDictionary setHomeState={changeHomeState}></NewDictionary>
                </>
            )
        default:
            return (
                <>
                    <h1>Something went wrong</h1>
                </>
            )
    }
};
