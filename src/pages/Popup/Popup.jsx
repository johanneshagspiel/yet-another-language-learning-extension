import React, {useLayoutEffect, useState, createContext, useContext, useEffect} from 'react';
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
    const [deck, setDeck] = useState("Choose a deck...");
    const [model, setModel] = useState("Basic");
    const [storage, setStorage] = useState("Anki");
    const [dictionary, setDictionary] = useState("PONS");


    const value = {sourceLanguageCode, saveSourceLanguageCode, targetLanguageCode, saveTargetLanguageCode,
        deck, saveDeck, model, saveModel, storage, saveStorage, dictionary, saveDictionary}

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
    async function saveDeck(newDeck) {
        const storeObj = {
            "deck": newDeck
        }
        await chrome.storage.local.set(storeObj);
        setDeck(newDeck);
    }
    async function saveModel(newModel) {
        const storeObj = {
            "model": newModel
        }
        await chrome.storage.local.set(storeObj);
        setModel(newModel);
    }
    async function saveStorage(newStorageObj) {
        const storeObj = {
            "storage": newStorageObj
        }
        await chrome.storage.local.set(storeObj);
        setStorage(newStorageObj);
    }
    async function saveDictionary(newDictionaryObj) {
        const storeObj = {
            "dictionary": newDictionaryObj
        }
        await chrome.storage.local.set(storeObj);
        setDictionary(newDictionaryObj);
    }



    async function changeHomeState(newState) {
        const storeObj = {
            "popupState": newState
        };
        await chrome.storage.local.set(storeObj);
        setHomeState(newState)
    }

    useEffect(async () => {

        const lastStateResult = await chrome.storage.local.get("popupState");
        const lastState = lastStateResult["popupState"];
        if (typeof lastState !== "undefined") {
            if (homeState !== lastState) {

                setHomeState(lastState);
            }
        }

        const storedSourceLanguageCodeObj = await chrome.storage.local.get("sourceLanguageCode");
        const storedSourceLanguageCode = storedSourceLanguageCodeObj["sourceLanguageCode"]
        if (typeof storedSourceLanguageCode !== "undefined") {
            setSourceLanguageCode(storedSourceLanguageCode);
        }

        const storedTargetLanguageCodeObj = await chrome.storage.local.get("targetLanguageCode");
        const storedTargetLanguageCode = storedTargetLanguageCodeObj["targetLanguageCode"]
        if (typeof storedTargetLanguageCode !== "undefined") {
            setTargetLanguageCode(storedTargetLanguageCode);
        }

        const storedDeckObj = await chrome.storage.local.get("deck");
        const storedDeck = storedDeckObj["deck"]
        if (typeof storedDeck !== "undefined") {
            setDeck(storedDeck);
        }

        const storedModelObj = await chrome.storage.local.get("model");
        const storedModel = storedModelObj["model"]
        if (typeof storedModel !== "undefined") {
            setModel(storedModel);
        }

        const storedStorageObj = await chrome.storage.local.get("storage");
        const storedStorage = storedStorageObj["storage"]
        if (typeof storedStorage !== "undefined") {
            setStorage(storedStorage);
        }

        const storedDictionaryObj = await chrome.storage.local.get("dictionary");
        const storedDictionary = storedDictionaryObj["dictionary"]
        if (typeof storedDictionary !== "undefined") {
            setDictionary(storedDictionary);
        }

        return () => {}
    }, []);


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
                <SelectionContext.Provider value={value}>
                    <div>
                        <NewStorage setHomeState={changeHomeState}></NewStorage>
                    </div>
                </SelectionContext.Provider>
            )
        case "NewDictionary":
            return (
                <SelectionContext.Provider value={value}>
                    <div>
                        <NewDictionary setHomeState={changeHomeState}></NewDictionary>
                    </div>
                </SelectionContext.Provider>
            )
        default:
            return (
                <>
                    <h1>Something went wrong</h1>
                </>
            )
    }
};
