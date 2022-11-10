import React, {useEffect, useState} from 'react';
import logo from '../../assets/img/logo.svg';
import SearchWord from "../../containers/WordSearch/SearchWord";
import './Popup.css';
import Home from "../../containers/Home/Home";
import NewDictionary from "../../containers/Home/NewDictionary/NewDictionary";

export default function Popup() {
    const [homeState, setHomeState] = useState("Home");

    // useEffect(async () => {
    //
    //     const lastSearchTextDic = await chrome.storage.local.get("last_search_text");
    //     const dictionaryListType = typeof lastSearchTextDic;
    //
    //     if (dictionaryListType !== "undefined") {
    //         setShowSearch(true);
    //     }
    // })

    switch (homeState) {
        case "WordSearch":
            return (
                <div>
                    <SearchWord></SearchWord>
                </div>
            );
        case "Home":
            return (
                <div>
                    <Home setHomeState={setHomeState}></Home>
                </div>
            );
        case "NewStorage":
            return (
                <>
                    <h1>NewStorage</h1>
                </>
            )
        case "NewDictionary":
            return (
                <>
                    <NewDictionary setHomeState={setHomeState}></NewDictionary>
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
