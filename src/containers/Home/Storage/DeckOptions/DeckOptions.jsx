import React from "react";

export default function DeckOptions({ deckNameList }) {

    async function saveDeck(deckName) {
        const storeObj = {
            "deckName": deckName
        };
        await chrome.storage.local.set(storeObj);
    }
    function selectNewDeck(e) {
        const deckName = e.target.value;
        saveDeck(deckName);
    }

    const optionList = deckNameList.map(((option, i) => {
        return (
            <option dangerouslySetInnerHTML={{ __html: option }} key={"option" + i} ></option>
        )
    }))

    return (
        <div>
            <label>Deck: </label>
            <select onChange={selectNewDeck}>
                {optionList}
            </select>
        </div>
    )
}