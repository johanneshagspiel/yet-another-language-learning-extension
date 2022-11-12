import React, {useEffect, useState} from 'react';
import SearchWord from "../../containers/WordSearch/SearchWord";
import './Popup.css';
import Home from "../../containers/Home/Home";
import NewDictionary from "../../containers/Home/NewDictionary/NewDictionary";
import NewStorage from "../../containers/Home/NewStorage/NewStorage";

export default function Popup() {
    const [homeState, setHomeState] = useState("WordSearch");

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
                    <SearchWord setHomeState={setHomeState}></SearchWord>
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
                    <NewStorage setHomeState={setHomeState}></NewStorage>
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
