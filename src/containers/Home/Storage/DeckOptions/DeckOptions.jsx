import React, {useContext} from "react";
import {SelectionContext} from "../../../SelectionContext/SelectionContext";
import Select from "react-select";

export default function DeckOptions({ deckNameList }) {
    const {deck, saveDeck} = useContext(SelectionContext);

    function selectNewDeck(e) {
        const deckName = e.value;
        saveDeck(deckName);
    }

    const optionList = deckNameList.map(((deckName) => {
        let obj = {}
        obj["value"] = deckName
        obj["label"] = deckName
        return obj
    }))

    const deckDefault = {}
    deckDefault["value"] = deck
    deckDefault["label"] = deck

    return (
        <div key={deck}>
            <label>Deck: </label>
            <Select options={optionList} defaultValue={deckDefault} onChange={selectNewDeck}></Select>
        </div>
    )
}